
"use client";
import styles from "./admin.module.css"
import React, { useState, useEffect } from "react";

import Menu from "@/components/Menu/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Configure Quill with modules including list and table support
const QuillNoSSRWrapper = dynamic(
  () => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        // SSR: return basic component without table
        import("react-quill").then((ReactQuillModule) => {
          const ReactQuill = ReactQuillModule.default || ReactQuillModule;
          resolve(({ value, onChange, placeholder, ...props }) => (
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...props}
            />
          ));
        });
        return;
      }

      // Import react-quill
      return import("react-quill").then((ReactQuillModule) => {
        const ReactQuill = ReactQuillModule.default || ReactQuillModule;
        const Quill = ReactQuill.Quill || require('quill');
        
        // Create a simple table insertion handler that Quill can manage
        const insertTable = function(rows = 2, cols = 2) {
          const quill = this.quill;
          const range = quill.getSelection(true);
          
          if (!range) {
            const length = quill.getLength();
            quill.setSelection(length - 1, 'user');
            return;
          }
          
          // Create table HTML with inline styles for visibility
          let tableHTML = '<table class="ql-table-inserted" style="width: 100%; border-collapse: collapse; margin: 15px 0; border: 2px solid #333; background: white; display: table;"><tbody>';
          for (let r = 0; r < rows; r++) {
            tableHTML += '<tr>';
            for (let c = 0; c < cols; c++) {
              tableHTML += '<td style="border: 1px solid #333; padding: 10px; min-width: 100px; background: white; vertical-align: top;"><p><br></p></td>';
            }
            tableHTML += '</tr>';
          }
          tableHTML += '</tbody></table>';
          
          // Insert directly into DOM and make it manageable
          const editor = quill.root;
          const selection = window.getSelection();
          
          if (selection.rangeCount > 0) {
            const nativeRange = selection.getRangeAt(0);
            nativeRange.deleteContents();
            
            // Create wrapper div for the table
            const wrapper = document.createElement('div');
            wrapper.className = 'ql-table-wrapper';
            wrapper.style.margin = '15px 0';
            wrapper.style.position = 'relative';
            wrapper.style.display = 'block';
            wrapper.style.width = '100%';
            wrapper.setAttribute('draggable', 'true');
            wrapper.setAttribute('contenteditable', 'false');
            wrapper.style.cursor = 'move';
            
            // Create table element
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = tableHTML;
            const table = tempDiv.querySelector('table');
            
            if (!table) {
              console.error('Failed to create table element');
              return;
            }
            
            // Make table resizable
            table.style.minWidth = '200px';
            table.style.minHeight = '100px';
            
            // Make all cells editable
            const cells = table.querySelectorAll('td');
            cells.forEach(cell => {
              cell.setAttribute('contenteditable', 'true');
              cell.style.outline = 'none';
              // Remove the <p><br></p> and make it truly empty for typing
              cell.innerHTML = '';
              
              // Allow typing in cells
              cell.addEventListener('focus', function() {
                this.style.outline = '2px solid #0066cc';
                this.style.outlineOffset = '-2px';
              });
              
              cell.addEventListener('blur', function() {
                this.style.outline = 'none';
              });
            });
            
            // Add table resize handle (for overall table size)
            const tableResizeHandle = document.createElement('div');
            tableResizeHandle.className = 'ql-table-resize-handle';
            tableResizeHandle.style.cssText = 'position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: #0066cc; cursor: nwse-resize; z-index: 10; border-radius: 3px 0 0 0;';
            tableResizeHandle.innerHTML = '↘';
            tableResizeHandle.setAttribute('contenteditable', 'false');
            
            wrapper.appendChild(table);
            wrapper.appendChild(tableResizeHandle);
            
            // Add table resize functionality (overall size)
            let isTableResizing = false;
            tableResizeHandle.addEventListener('mousedown', function(e) {
              e.preventDefault();
              e.stopPropagation();
              isTableResizing = true;
              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = table.offsetWidth;
              const startHeight = table.offsetHeight;
              
              const onMouseMove = (e) => {
                if (!isTableResizing) return;
                const width = startWidth + (e.clientX - startX);
                const height = startHeight + (e.clientY - startY);
                table.style.width = Math.max(200, width) + 'px';
                table.style.height = Math.max(100, height) + 'px';
              };
              
              const onMouseUp = () => {
                isTableResizing = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                quill.update('user');
              };
              
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            });
            
            // Add row and column resize handles after table is inserted
            setTimeout(() => {
              const updateRowHandles = () => {
                // Remove old row handles
                wrapper.querySelectorAll('.ql-row-resize-handle').forEach(h => h.remove());
                
                const rows = table.querySelectorAll('tr');
                rows.forEach((row, rowIndex) => {
                  // Add resize handle for each row
                  const rowResizeHandle = document.createElement('div');
                  rowResizeHandle.className = 'ql-row-resize-handle';
                  rowResizeHandle.setAttribute('contenteditable', 'false');
                  
                  const updatePosition = () => {
                    const rowRect = row.getBoundingClientRect();
                    const wrapperRect = wrapper.getBoundingClientRect();
                    rowResizeHandle.style.cssText = `
                      position: absolute;
                      right: -10px;
                      top: ${rowRect.top - wrapperRect.top}px;
                      width: 10px;
                      height: ${rowRect.height}px;
                      background: #0066cc;
                      cursor: ns-resize;
                      z-index: 5;
                      opacity: 0;
                      transition: opacity 0.2s;
                    `;
                  };
                  
                  updatePosition();
                  wrapper.appendChild(rowResizeHandle);
                  
                  // Show handle on hover
                  row.addEventListener('mouseenter', function() {
                    updatePosition();
                    rowResizeHandle.style.opacity = '1';
                  });
                  
                  row.addEventListener('mouseleave', function() {
                    rowResizeHandle.style.opacity = '0';
                  });
                  
                  // Row resize functionality
                  let isRowResizing = false;
                  rowResizeHandle.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    isRowResizing = true;
                    const startY = e.clientY;
                    const startHeight = row.offsetHeight;
                    
                    const onMouseMove = (e) => {
                      if (!isRowResizing) return;
                      const height = startHeight + (e.clientY - startY);
                      row.style.height = Math.max(30, height) + 'px';
                      updatePosition();
                    };
                    
                    const onMouseUp = () => {
                      isRowResizing = false;
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);
                      updatePosition();
                      quill.update('user');
                    };
                    
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                  });
                });
              };
              
              const updateColumnHandles = () => {
                // Remove old column handles
                wrapper.querySelectorAll('.ql-col-resize-handle').forEach(h => h.remove());
                
                // Get first row to determine column positions
                const firstRow = table.querySelector('tr');
                if (!firstRow) return;
                
                const cells = firstRow.querySelectorAll('td');
                const tableRect = table.getBoundingClientRect();
                const wrapperRect = wrapper.getBoundingClientRect();
                
                cells.forEach((cell, colIndex) => {
                  // Skip last column (resize handle goes between columns)
                  if (colIndex >= cells.length - 1) return;
                  
                  const cellRect = cell.getBoundingClientRect();
                  const nextCell = cells[colIndex + 1];
                  const nextCellRect = nextCell.getBoundingClientRect();
                  
                  // Create column resize handle between this cell and next
                  const colResizeHandle = document.createElement('div');
                  colResizeHandle.className = 'ql-col-resize-handle';
                  colResizeHandle.setAttribute('data-col-index', colIndex);
                  colResizeHandle.setAttribute('contenteditable', 'false');
                  
                  const updateColPosition = () => {
                    const cellRect = cell.getBoundingClientRect();
                    const wrapperRect = wrapper.getBoundingClientRect();
                    const handleX = cellRect.right - wrapperRect.left;
                    
                    colResizeHandle.style.cssText = `
                      position: absolute;
                      left: ${handleX - 3}px;
                      top: ${tableRect.top - wrapperRect.top}px;
                      width: 6px;
                      height: ${tableRect.height}px;
                      background: #0066cc;
                      cursor: ew-resize;
                      z-index: 5;
                      opacity: 0;
                      transition: opacity 0.2s;
                    `;
                  };
                  
                  updateColPosition();
                  wrapper.appendChild(colResizeHandle);
                  
                  // Show handle on hover over table
                  table.addEventListener('mouseenter', function() {
                    updateColPosition();
                    colResizeHandle.style.opacity = '0.5';
                  });
                  
                  table.addEventListener('mouseleave', function() {
                    colResizeHandle.style.opacity = '0';
                  });
                  
                  colResizeHandle.addEventListener('mouseenter', function() {
                    updateColPosition();
                    this.style.opacity = '1';
                  });
                  
                  // Column resize functionality
                  let isColResizing = false;
                  colResizeHandle.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    isColResizing = true;
                    const startX = e.clientX;
                    const startWidth = cell.offsetWidth;
                    const nextCell = cells[colIndex + 1];
                    const startNextWidth = nextCell ? nextCell.offsetWidth : 0;
                    
                    const onMouseMove = (e) => {
                      if (!isColResizing) return;
                      const diff = e.clientX - startX;
                      const newWidth = Math.max(50, startWidth + diff);
                      
                      // Resize current column
                      cell.style.width = newWidth + 'px';
                      cell.style.minWidth = newWidth + 'px';
                      
                      // Adjust next column if needed
                      if (nextCell) {
                        const newNextWidth = Math.max(50, startNextWidth - diff);
                        nextCell.style.width = newNextWidth + 'px';
                        nextCell.style.minWidth = newNextWidth + 'px';
                      }
                      
                      // Update all cells in this column
                      const allRows = table.querySelectorAll('tr');
                      allRows.forEach(row => {
                        const rowCell = row.querySelectorAll('td')[colIndex];
                        if (rowCell && rowCell !== cell) {
                          rowCell.style.width = newWidth + 'px';
                          rowCell.style.minWidth = newWidth + 'px';
                        }
                      });
                      
                      updateColPosition();
                    };
                    
                    const onMouseUp = () => {
                      isColResizing = false;
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);
                      updateColPosition();
                      quill.update('user');
                    };
                    
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                  });
                });
              };
              
              updateRowHandles();
              updateColumnHandles();
              
              // Update handles when table content changes
              const observer = new MutationObserver(() => {
                updateRowHandles();
                updateColumnHandles();
              });
              observer.observe(table, { childList: true, subtree: true, attributes: true });
            }, 200);
            
            // Insert wrapper into editor
            nativeRange.insertNode(wrapper);
            
            // Add paragraph after table for proper cursor positioning
            const pAfter = document.createElement('p');
            pAfter.innerHTML = '<br>';
            pAfter.setAttribute('data-quill-placeholder', '');
            
            // Insert paragraph after wrapper
            if (wrapper.nextSibling) {
              wrapper.parentNode.insertBefore(pAfter, wrapper.nextSibling);
            } else {
              wrapper.parentNode.appendChild(pAfter);
            }
            
            // Ensure wrapper is properly isolated as a block element
            wrapper.setAttribute('data-table-block', 'true');
            
            // Add a paragraph before if needed for proper structure
            const prevSibling = wrapper.previousSibling;
            if (!prevSibling || (prevSibling.nodeType === 1 && prevSibling.tagName !== 'P')) {
              const pBefore = document.createElement('p');
              pBefore.innerHTML = '<br>';
              wrapper.parentNode.insertBefore(pBefore, wrapper);
            }
            
            // Make table draggable (but not cells)
            let isDragging = false;
            let dragStartY = 0;
            let dragStartX = 0;
            let placeholder = null;
            let dragStartTime = 0;
            
            // Only allow drag when clicking on wrapper border, not cells
            wrapper.addEventListener('mousedown', function(e) {
              // Don't start drag if clicking on cells, resize handles, or inside table
              if (e.target.tagName === 'TD' || 
                  e.target.closest('td') ||
                  e.target === tableResizeHandle ||
                  e.target.classList.contains('ql-row-resize-handle') ||
                  e.target.classList.contains('ql-col-resize-handle')) {
                return;
              }
              
              dragStartTime = Date.now();
              dragStartY = e.clientY;
              dragStartX = e.clientX;
            });
            
            wrapper.addEventListener('dragstart', function(e) {
              // Only start drag if mouse moved enough (not just a click)
              const timeDiff = Date.now() - dragStartTime;
              const yDiff = Math.abs(e.clientY - dragStartY);
              const xDiff = Math.abs(e.clientX - dragStartX);
              
              // Don't drag if clicking on cells
              if (e.target.tagName === 'TD' || e.target.closest('td')) {
                e.preventDefault();
                return;
              }
              
              // Only drag if mouse moved significantly or held down
              if (timeDiff < 200 && yDiff < 5 && xDiff < 5) {
                e.preventDefault();
                return;
              }
              
              isDragging = true;
              
              // Create placeholder
              placeholder = document.createElement('div');
              placeholder.style.height = wrapper.offsetHeight + 'px';
              placeholder.style.margin = '15px 0';
              placeholder.style.border = '2px dashed #0066cc';
              placeholder.style.borderRadius = '4px';
              placeholder.style.backgroundColor = '#e6f2ff';
              placeholder.className = 'ql-table-drag-placeholder';
              
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/html', '');
              
              // Add visual feedback
              wrapper.style.opacity = '0.5';
            });
            
            wrapper.addEventListener('dragend', function(e) {
              isDragging = false;
              wrapper.style.opacity = '1';
              if (placeholder && placeholder.parentNode) {
                placeholder.remove();
              }
              quill.update('user');
            });
            
            // Handle drag over other elements
            const handleDragOver = function(e) {
              if (isDragging && e.target !== wrapper && !wrapper.contains(e.target)) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                let target = e.target;
                
                // Find a suitable drop target (paragraph or wrapper)
                while (target && target !== editor && 
                       target.tagName !== 'P' && 
                       !target.classList.contains('ql-table-wrapper') &&
                       target.parentNode) {
                  target = target.parentNode;
                }
                
                if (!target || target === editor) return;
                
                const targetRect = target.getBoundingClientRect();
                const y = e.clientY;
                
                // Determine if we should insert before or after
                const midpoint = targetRect.top + (targetRect.height / 2);
                const insertBefore = y < midpoint;
                
                if (placeholder) {
                  if (!placeholder.parentNode) {
                    // Insert placeholder
                    if (insertBefore) {
                      target.parentNode.insertBefore(placeholder, target);
                    } else {
                      if (target.nextSibling) {
                        target.parentNode.insertBefore(placeholder, target.nextSibling);
                      } else {
                        target.parentNode.appendChild(placeholder);
                      }
                    }
                  } else {
                    // Move placeholder
                    if (insertBefore && placeholder.nextSibling !== target) {
                      target.parentNode.insertBefore(placeholder, target);
                    } else if (!insertBefore && placeholder.previousSibling !== target) {
                      if (target.nextSibling) {
                        target.parentNode.insertBefore(placeholder, target.nextSibling);
                      } else {
                        target.parentNode.appendChild(placeholder);
                      }
                    }
                  }
                }
              }
            };
            
            editor.addEventListener('dragover', handleDragOver);
            
            wrapper.addEventListener('drop', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              if (placeholder && placeholder.parentNode && isDragging) {
                // Insert wrapper at placeholder position
                placeholder.parentNode.insertBefore(wrapper, placeholder);
                placeholder.remove();
                quill.update('user');
              }
            });
            
            // Track if table is explicitly selected for deletion
            let isTableSelected = false;
            
            // Add delete button to table
            const deleteButton = document.createElement('button');
            deleteButton.className = 'ql-table-delete-button';
            deleteButton.innerHTML = '×';
            deleteButton.setAttribute('title', 'Delete Table');
            deleteButton.style.cssText = `
              position: absolute;
              top: -12px;
              right: -12px;
              width: 24px;
              height: 24px;
              background: #dc2626;
              color: white;
              border: none;
              border-radius: 50%;
              cursor: pointer;
              font-size: 18px;
              line-height: 1;
              display: none;
              z-index: 20;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            `;
            deleteButton.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              // Remove associated paragraphs
              if (wrapper.nextSibling && wrapper.nextSibling.tagName === 'P' && 
                  wrapper.nextSibling.textContent.trim() === '') {
                wrapper.nextSibling.remove();
              }
              if (wrapper.previousSibling && wrapper.previousSibling.tagName === 'P' && 
                  wrapper.previousSibling.textContent.trim() === '') {
                wrapper.previousSibling.remove();
              }
              
              wrapper.remove();
              quill.update('user');
              
              // Move cursor to next paragraph
              setTimeout(() => {
                const nextP = quill.root.querySelector('p');
                if (nextP) {
                  const newRange = document.createRange();
                  newRange.setStart(nextP, 0);
                  newRange.collapse(true);
                  const sel = window.getSelection();
                  sel.removeAllRanges();
                  sel.addRange(newRange);
                  editor.focus();
                }
              }, 10);
            });
            wrapper.appendChild(deleteButton);
            
            // Make table selectable (but allow cell editing)
            wrapper.addEventListener('click', function(e) {
              // Don't interfere if clicking on resize handles, cells, or delete button
              if (e.target === tableResizeHandle || 
                  e.target === deleteButton ||
                  e.target.classList.contains('ql-row-resize-handle') ||
                  e.target.classList.contains('ql-col-resize-handle') ||
                  e.target.tagName === 'TD' ||
                  e.target.closest('td')) {
                return;
              }
              
              // Select wrapper and show delete button
              e.stopPropagation();
              isTableSelected = true;
              wrapper.classList.add('ql-table-selected');
              deleteButton.style.display = 'flex';
              deleteButton.style.alignItems = 'center';
              deleteButton.style.justifyContent = 'center';
              
              const sel = window.getSelection();
              const range = document.createRange();
              range.selectNodeContents(wrapper);
              sel.removeAllRanges();
              sel.addRange(range);
            });
            
            // Hide delete button when clicking elsewhere
            editor.addEventListener('click', function(e) {
              if (!wrapper.contains(e.target) && e.target !== deleteButton) {
                isTableSelected = false;
                wrapper.classList.remove('ql-table-selected');
                deleteButton.style.display = 'none';
              }
            }, true);
            
            // Handle deletion ONLY when table is explicitly selected (via click)
            wrapper.addEventListener('keydown', function(e) {
              // Only delete if table was explicitly selected by clicking on it
              if (isTableSelected && (e.key === 'Backspace' || e.key === 'Delete')) {
                e.preventDefault();
                e.stopPropagation();
                
                // Store reference to next element for cursor positioning
                const nextElement = wrapper.nextSibling;
                const prevElement = wrapper.previousSibling;
                
                // Remove associated paragraphs
                if (wrapper.nextSibling && wrapper.nextSibling.tagName === 'P' && 
                    wrapper.nextSibling.textContent.trim() === '') {
                  wrapper.nextSibling.remove();
                }
                if (wrapper.previousSibling && wrapper.previousSibling.tagName === 'P' && 
                    wrapper.previousSibling.textContent.trim() === '') {
                  wrapper.previousSibling.remove();
                }
                
                // Remove the wrapper
                wrapper.remove();
                isTableSelected = false;
                
                // Update Quill
                quill.update('user');
                
                // Move cursor to appropriate position
                setTimeout(() => {
                  let targetElement = nextElement;
                  if (!targetElement || targetElement.tagName !== 'P') {
                    targetElement = prevElement;
                  }
                  if (!targetElement || targetElement.tagName !== 'P') {
                    targetElement = quill.root.querySelector('p');
                  }
                  
                  if (targetElement && targetElement.tagName === 'P') {
                    const newRange = document.createRange();
                    newRange.setStart(targetElement, 0);
                    newRange.collapse(true);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(newRange);
                    editor.focus();
                  }
                }, 10);
              }
            });
            
            // Prevent accidental deletion when typing near table
            editor.addEventListener('keydown', function(e) {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                  const range = sel.getRangeAt(0);
                  
                  // Only prevent if table is NOT explicitly selected
                  if (!isTableSelected) {
                    // Check if cursor is in a cell - allow normal deletion
                    if (range.startContainer.tagName === 'TD' || 
                        range.startContainer.closest && range.startContainer.closest('td')) {
                      return; // Allow normal deletion in cells
                    }
                    
                    // If cursor is near table but table not selected, prevent deletion
                    if (wrapper.parentNode && 
                        (range.commonAncestorContainer === wrapper || 
                         wrapper.contains(range.commonAncestorContainer))) {
                      // Don't prevent - let normal backspace work, but don't delete table
                      return;
                    }
                  }
                }
              }
            }, true);
            
            // Prevent backspace from affecting content above table
            wrapper.addEventListener('keydown', function(e) {
              // If cursor is at start of paragraph after table and backspace is pressed
              if (e.key === 'Backspace') {
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                  const range = sel.getRangeAt(0);
                  const pAfterTable = wrapper.nextSibling;
                  
                  // If cursor is at start of paragraph after table
                  if (pAfterTable && pAfterTable.tagName === 'P' && 
                      range.startContainer === pAfterTable && 
                      range.startOffset === 0 && 
                      range.collapsed) {
                    // Don't prevent default, but ensure table isn't deleted
                    // The normal backspace behavior should just delete the empty paragraph
                    return;
                  }
                }
              }
            }, true);
            
            // Set cursor to paragraph after table (not inside table)
            setTimeout(() => {
              // Find the paragraph after the table
              const pAfterTable = wrapper.nextSibling;
              if (pAfterTable && pAfterTable.tagName === 'P') {
                const range = document.createRange();
                range.setStart(pAfterTable, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                
                // Focus the editor
                editor.focus();
              } else {
                // Fallback: focus first cell if paragraph not found
                const firstCell = table.querySelector('td');
                if (firstCell) {
                  firstCell.focus();
                  if (firstCell.textContent.trim() === '') {
                    const textNode = document.createTextNode('\u200B');
                    firstCell.appendChild(textNode);
                    const range = document.createRange();
                    range.setStart(textNode, 0);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                  }
                }
              }
            }, 100);
            
            // Ensure cells stay editable when clicked
            cells.forEach(cell => {
              // Make cell focusable and editable
              cell.setAttribute('tabindex', '0');
              
              cell.addEventListener('click', function(e) {
                e.stopPropagation();
                // Focus the cell
                this.focus();
                
                // If empty, add a zero-width space so cursor appears
                if (this.textContent.trim() === '') {
                  const range = document.createRange();
                  range.selectNodeContents(this);
                  range.collapse(true);
                  const sel = window.getSelection();
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              });
              
              // Prevent wrapper from interfering with cell editing
              cell.addEventListener('mousedown', function(e) {
                e.stopPropagation();
              });
              
              // Handle input in cells
              cell.addEventListener('input', function() {
                quill.update('user');
              });
            });
            
            // Intercept backspace/delete in paragraph after table to prevent deleting content above
            const pAfterTableForHandler = wrapper.nextSibling;
            if (pAfterTableForHandler && pAfterTableForHandler.tagName === 'P') {
              pAfterTableForHandler.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace') {
                  const sel = window.getSelection();
                  if (sel.rangeCount > 0) {
                    const range = sel.getRangeAt(0);
                    // If cursor is at the very start of paragraph after table
                    if (range.startContainer === pAfterTableForHandler && 
                        range.startOffset === 0 && 
                        range.collapsed) {
                      // Check if there's content before the table
                      const pBefore = wrapper.previousSibling;
                      if (pBefore && pBefore.tagName === 'P' && pBefore.textContent.trim() === '') {
                        // Empty paragraph before, allow deletion (will delete empty p)
                        return;
                      }
                      // Prevent default to stop deletion of content above table
                      e.preventDefault();
                      e.stopPropagation();
                      // Just ensure cursor stays in place
                      const newRange = document.createRange();
                      newRange.setStart(pAfterTableForHandler, 0);
                      newRange.collapse(true);
                      sel.removeAllRanges();
                      sel.addRange(newRange);
                    }
                  }
                }
              }, true);
            }
            
            // Update Quill
            quill.update('user');
          }
        };
        
        // Configure modules with custom table support
        const modules = {
          toolbar: {
            container: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'video'],
              ['insertTable'],
              ['clean']
            ],
            handlers: {
              'insertTable': function() {
                // Simple prompt for table size (you can enhance this with a modal)
                const rowsInput = prompt('Number of rows:', '2');
                const colsInput = prompt('Number of columns:', '2');
                
                if (rowsInput === null || colsInput === null) {
                  return; // User cancelled
                }
                
                const rows = parseInt(rowsInput) || 2;
                const cols = parseInt(colsInput) || 2;
                
                console.log('Inserting table:', rows, 'x', cols);
                insertTable.call(this, rows, cols);
              }
            }
          },
          clipboard: {
            // Preserve table HTML when pasting/converting
            matchers: [
              ['TABLE', function(node, delta) {
                // Preserve table structure
                return delta.compose(new (Quill.import('delta'))().insert(node.outerHTML));
              }],
              ['TD', function(node, delta) {
                // Preserve table cells
                return delta;
              }],
              ['TR', function(node, delta) {
                // Preserve table rows
                return delta;
              }]
            ]
          }
        };

        const QuillComponent = ({ value, onChange, placeholder, ...props }) => {
          const quillRef = React.useRef(null);
          
          // Add styles for tables to be visible and deletable, and table button icon
          React.useEffect(() => {
            const styleId = 'quill-table-styles';
            if (!document.getElementById(styleId)) {
              const style = document.createElement('style');
              style.id = styleId;
              style.textContent = `
                .ql-editor .ql-table-wrapper {
                  margin: 15px 0;
                  position: relative;
                  display: block;
                  width: 100%;
                  outline: 2px dashed transparent;
                  outline-offset: 2px;
                  cursor: move;
                }
                .ql-editor .ql-table-wrapper:hover {
                  outline-color: #0066cc;
                }
                .ql-editor .ql-table-wrapper.ql-table-selected {
                  outline: 2px solid #0066cc;
                  outline-offset: 2px;
                }
                .ql-editor .ql-table-delete-button {
                  position: absolute;
                  top: -12px;
                  right: -12px;
                  width: 24px;
                  height: 24px;
                  background: #dc2626;
                  color: white;
                  border: none;
                  border-radius: 50%;
                  cursor: pointer;
                  font-size: 18px;
                  line-height: 1;
                  display: none;
                  z-index: 20;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  align-items: center;
                  justify-content: center;
                }
                .ql-editor .ql-table-delete-button:hover {
                  background: #b91c1c;
                  transform: scale(1.1);
                }
                .ql-editor .ql-table-wrapper[draggable="true"] {
                  user-select: none;
                }
                .ql-editor .ql-table-wrapper table {
                  pointer-events: auto;
                }
                .ql-editor .ql-table-wrapper table td {
                  cursor: text;
                  user-select: text;
                }
                .ql-editor .ql-table-drag-placeholder {
                  height: 60px;
                  margin: 15px 0;
                  border: 2px dashed #0066cc;
                  border-radius: 4px;
                  background-color: #e6f2ff;
                  display: block;
                }
                .ql-editor table.ql-table-inserted {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 0;
                  border: 2px solid #333;
                  background: white;
                  display: table !important;
                  table-layout: auto;
                  min-width: 200px;
                  min-height: 100px;
                }
                .ql-editor table.ql-table-inserted td {
                  border: 1px solid #333;
                  padding: 10px;
                  min-width: 100px;
                  background: white;
                  vertical-align: top;
                }
                .ql-editor table.ql-table-inserted td:focus {
                  outline: 2px solid #0066cc;
                  outline-offset: -2px;
                }
                .ql-editor .ql-table-resize-handle {
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  width: 20px;
                  height: 20px;
                  background: #0066cc;
                  color: white;
                  cursor: nwse-resize;
                  z-index: 10;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  border-radius: 3px 0 0 0;
                }
                .ql-editor .ql-table-resize-handle:hover {
                  background: #0052a3;
                }
                .ql-editor .ql-row-resize-handle {
                  position: absolute;
                  right: -10px;
                  width: 10px;
                  background: #0066cc;
                  cursor: ns-resize;
                  z-index: 5;
                  opacity: 0;
                  transition: opacity 0.2s;
                }
                .ql-editor .ql-row-resize-handle:hover {
                  opacity: 1 !important;
                }
                .ql-editor .ql-col-resize-handle {
                  position: absolute;
                  width: 6px;
                  background: #0066cc;
                  cursor: ew-resize;
                  z-index: 5;
                  opacity: 0;
                  transition: opacity 0.2s;
                }
                .ql-editor .ql-col-resize-handle:hover {
                  opacity: 1 !important;
                  background: #0052a3;
                }
                .ql-editor table.ql-table-inserted td[contenteditable="true"] {
                  min-height: 30px;
                  cursor: text;
                }
                .ql-editor table.ql-table-inserted td[contenteditable="true"]:empty::before {
                  content: ' ';
                  color: transparent;
                }
                /* Table button icon */
                button.ql-insertTable,
                .ql-toolbar button.ql-insertTable {
                  width: 28px;
                  height: 24px;
                  display: inline-block;
                }
                button.ql-insertTable::before,
                .ql-toolbar button.ql-insertTable::before {
                  content: '⊞';
                  font-size: 18px;
                  line-height: 1;
                  display: inline-block;
                }
                button.ql-insertTable:hover::before,
                .ql-toolbar button.ql-insertTable:hover::before {
                  opacity: 0.7;
                }
                /* Alternative table icon using SVG/Unicode */
                .ql-toolbar .ql-insertTable {
                  position: relative;
                }
                .ql-toolbar .ql-insertTable svg {
                  display: none;
                }
              `;
              document.head.appendChild(style);
            }
          }, []);
          
          // Ensure table button appears after component mounts
          React.useEffect(() => {
            const timer = setTimeout(() => {
              if (quillRef.current) {
                try {
                  const quill = quillRef.current.getEditor();
                  const toolbar = quill.getModule('toolbar');
                  const toolbarElement = toolbar.container;
                  
                  // Check if button already exists
                  let tableButton = toolbarElement.querySelector('.ql-insertTable');
                  
                  if (!tableButton) {
                    // Find the video button and add table button after it
                    const videoButton = toolbarElement.querySelector('.ql-video');
                    if (videoButton) {
                      tableButton = document.createElement('button');
                      tableButton.type = 'button';
                      tableButton.className = 'ql-insertTable';
                      tableButton.setAttribute('aria-label', 'Insert Table');
                      tableButton.setAttribute('title', 'Insert Table');
                      tableButton.innerHTML = '<svg viewBox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect><line class="ql-stroke" x1="9" x2="9" y1="3" y2="15"></line><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line></svg>';
                      
                      // Insert after video button
                      videoButton.parentNode.insertBefore(tableButton, videoButton.nextSibling);
                    }
                  }
                  
                  // Add/update click handler
                  if (tableButton) {
                    // Remove old listeners by replacing the button
                    const newButton = tableButton.cloneNode(true);
                    tableButton.parentNode.replaceChild(newButton, tableButton);
                    
                    // Add click handler
                    newButton.addEventListener('click', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      const quill = quillRef.current.getEditor();
                      const toolbar = quill.getModule('toolbar');
                      
                      // Call the handler from modules configuration
                      if (toolbar.handlers && toolbar.handlers.insertTable) {
                        toolbar.handlers.insertTable.call({ quill });
                      }
                    });
                  }
                } catch (error) {
                  console.error('Error setting up table button:', error);
                }
              }
            }, 100);
            
            return () => clearTimeout(timer);
          }, [value]); // Re-run when value changes to catch new editor instances
          
          return (
            <ReactQuill
              ref={quillRef}
              theme="snow"
              modules={modules}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...props}
            />
          );
        };
        
        resolve(QuillComponent);
      }).catch((error) => {
        console.error('Error loading Quill modules:', error);
        // Fallback to basic Quill without table support
        import("react-quill").then((ReactQuillModule) => {
          const ReactQuill = ReactQuillModule.default || ReactQuillModule;
          const modules = {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'video'],
              ['clean']
            ],
          };
          resolve(({ value, onChange, placeholder, ...props }) => (
            <ReactQuill
              theme="snow"
              modules={modules}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...props}
            />
          ));
        });
      });
    });
  },
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({

  post_number: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  slug: z.string().min(3, {
    message: "slug must be at least 3 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  subtitle: z.string().optional(),
  image: z.string().url({
    message: "Image must be a valid URL.",
  }),
  image2: z.string().url({
    message: "Image must be a valid URL.",
  }),
  avatar: z.string().url({
    message: "Avatar must be a valid URL.",
  }),
  introduction: z.string().min(3, {
    message: "introduction must be at least 3 chharacters",
  }),

  body1_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body1: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  body2_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body2: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  body3_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body3: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body4_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body4: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body5_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body5: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body6_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body6: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body7_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body7: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body8_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body8: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body9_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body9: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body10_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body10: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body11_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body11: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


   body12_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body12: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),



   body13_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body13: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),



   body14_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body14: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),



  body15_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body15: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),



  body16_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body16: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),



   body17_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body17: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),



   body18_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body18: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),










  video: z.string().url({
    message: "Video must be a valid URL.",
  }).optional(),
  conclusion: z.string().optional(),
});

export function Admin() {
  const form = useForm({
    resolver: zodResolver(formSchema),
      defaultValues: {
      post_number: "",
      title: "",
      author: "",
      subtitle: "",
      image: "",
      image2: "",
      avatar: "",
      slug: "",
      body1_title: "",
      body1: "",
      body2_title: "",
      body2: "",
      body3_title: "",
      body3: "",
      body4_title: "",
      body4: "",
      body5_title: "",
      body5: "",
      body6_title: "",
      body6: "",
      body7_title: "",
      body7: "",
      body8_title: "",
      body8: "",
      body9_title: "",
      body9: "",
      body10_title: "",
      body10: "",
      body11_title: "",
      body11: "",
      body12_title: "",
      body12: "",
      body13_title: "",
      body13: "",
      body14_title: "",
      body14: "",
      body15_title: "",
      body15: "",
      body16_title: "",
      body16: "",
      body17_title: "",
      body17: "",
      body18_title: "",
      body18: "",
      introduction: "",
      video: "",
      conclusion: "",

    },
  });
  const [story, setStory] = useState({
      post_number: "",
      title: "",
      author: "",
      subtitle: "",
      image: "",
      image2: "",
      avatar: "",
      slug: "",
      body1_title: "",
      body1: "",
      body2_title: "",
      body2: "",
      body3_title: "",
      body3: "",
      body4_title: "",
      body4: "",
      body5_title: "",
      body5: "",
      body6_title: "",
      body6: "",
      body7_title: "",
      body7: "",
      body8_title: "",
      body8: "",
      body9_title: "",
      body9: "",
      body10_title: "",
      body10: "",
      body11_title: "",
      body11: "",
      body12_title: "",
      body12: "",
      body13_title: "",
      body13: "",
      body14_title: "",
      body14: "",
      body15_title: "",
      body15: "",
      body16_title: "",
      body16: "",
      body17_title: "",
      body17: "",
      body18_title: "",
      body18: "",   
      introduction: "",
      video: "",
      conclusion: "",
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [stories, setStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [storiesLoading, setStoriesLoading] = useState(true);

  // Fetch stories on component mount
  useEffect(() => {
    fetchStories();
  }, []);

  const stripHtml = (html) => {
    if (!html) return "";
    // Remove HTML tags using regex
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  };

  const fetchStories = async () => {
    try {
      setStoriesLoading(true);
      const res = await fetch("/api/admin_route");
      if (res.ok) {
        const result = await res.json();
        setStories(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setStoriesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setIsEditing(true);
    // Populate form with story data
    form.reset({
      post_number: story.post_number || "",
      title: story.title || "",
      author: story.author || "",
      subtitle: story.subtitle || "",
      image: story.image || "",
      image2: story.image2 || "",
      avatar: story.avatar || "",
      slug: story.slug || "",
      body1_title: story.body1_title || "",
      body1: story.body1 || "",
      body2_title: story.body2_title || "",
      body2: story.body2 || "",
      body3_title: story.body3_title || "",
      body3: story.body3 || "",
      body4_title: story.body4_title || "",
      body4: story.body4 || "",
      body5_title: story.body5_title || "",
      body5: story.body5 || "",
      body6_title: story.body6_title || "",
      body6: story.body6 || "",
      body7_title: story.body7_title || "",
      body7: story.body7 || "",
      body8_title: story.body8_title || "",
      body8: story.body8 || "",
      body9_title: story.body9_title || "",
      body9: story.body9 || "",
      body10_title: story.body10_title || "",
      body10: story.body10 || "",
      body11_title: story.body10_title || "",
      body11: story.body10 || "",
      body12_title: story.body10_title || "",
      body12: story.body10 || "",
      body13_title: story.body10_title || "",
      body13: story.body10 || "",
      body14_title: story.body10_title || "",
      body14: story.body10 || "",
      body15_title: story.body10_title || "",
      body15: story.body10 || "",
      body16_title: story.body10_title || "",
      body16: story.body10 || "",
      body17_title: story.body10_title || "",
      body17: story.body10 || "",
      body18_title: story.body10_title || "",
      body18: story.body10 || "",
      introduction: story.introduction || "",
      video: story.video || "",
      conclusion: story.conclusion || "",
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingStory(null);
    form.reset();
  };

  const handlePublish = async (storyId) => {
    try {
      const res = await fetch("/api/admin_route", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: storyId,
          published: true,
          publishDate: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("Story published successfully!");
        fetchStories();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Error: ${errorData.error || "Failed to publish story"}`);
      }
    } catch (error) {
      console.error("Error publishing story:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    console.log("Validated data:", data);
    try {
      const url = "/api/admin_route";
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing
        ? JSON.stringify({ ...data, _id: editingStory._id })
        : JSON.stringify(data);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error submitting story:", errorData);
        alert(`Error: ${errorData.error || "Failed to submit story"}`);
      } else {
        const result = await res.json();
        alert(isEditing ? "Story updated successfully!" : "Story added successfully!");
        form.reset();
        setIsEditing(false);
        setEditingStory(null);
        fetchStories();
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An unexpected error occurred. Check the console for details.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };


  return (

    <section >
      <style dangerouslySetInnerHTML={{__html: `
        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5em !important;
          margin: 0.5em 0 !important;
          list-style-position: outside !important;
        }
        .ql-editor ul {
          list-style-type: disc !important;
        }
        .ql-editor ol {
          list-style-type: decimal !important;
        }
        .ql-editor li {
          display: list-item !important;
          margin: 0.25em 0 !important;
          padding-left: 0.5em !important;
        }
      `}} />
      <Menu />
      <div className={styles.container}>
        {/* Main Content Area - Form */}
        <div className={styles.mainContent}>
        <div className={styles.formDiv} >
            <h1 style={{ textAlign: "center", fontSize: "x-large", fontWeight: "600" }}>
              {isEditing ? "Edit Story" : "Create New Story"}
            </h1>
            {isEditing && (
              <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  variant="outline"
                  size="sm"
                >
                  Cancel Edit
                </Button>
              </div>
            )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

              <FormField
                control={form.control}
                name="post_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>post_number</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your post_number here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
  control={form.control}
  name="slug"
  render={({ field }) => (
    <FormItem className="space-y-2">
      <FormLabel className="text-sm font-medium text-gray-700">
        Slug
      </FormLabel>
      <FormControl>
        <div className="relative">
          <textarea
            {...field}
            rows={3}
            className={`
              w-full p-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all
              placeholder:text-gray-400 text-sm
              resize-none
            `}
            placeholder="Write your slug here..."
            value={field.value || ""}
            onChange={(e) => {
              let value = e.target.value.trim(); // Trim spaces from start & end
              let formattedValue = value
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with "-"
                .replace(/[^a-z0-9-]/g, ""); // Remove invalid characters
              
              field.onChange(formattedValue);
            }}
            maxLength={50}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {field.value?.length || 0}/50
          </div>
        </div>
      </FormControl>
      {/* Slug Preview and Copy Button */}
      {field.value && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600">
            Preview: <span className="font-mono text-blue-500">{field.value}</span>
          </span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(field.value)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Copy
          </button>
        </div>
      )}
      <FormMessage className="text-xs text-red-500" />
    </FormItem>
  )}
/>

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your subtitle here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter secondary image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Avatar URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>introduction</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your introduction here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body1_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body1_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body1_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body1</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body1 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="body2_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body2_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body2_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body2</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body2 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="body3_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body3_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body3_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                  />  


              <FormField
                control={form.control}
                name="body3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body3</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body3 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body4_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body4_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body4_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body4</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body4 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body5_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body5_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body5_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body5"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body5</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body5 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body6_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body6_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body6_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body6</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body6 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body7_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body7_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body7_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body7"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body7</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body7 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <FormField
                control={form.control}
                name="body8_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body8_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body8_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body8"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body8</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body8 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



            <FormField
                control={form.control}
                name="body9_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body9_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body9_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body9"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body9</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body9 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body10_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body10</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



           <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body11_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body11</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />




         <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body12_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body12</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />





         <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body13_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body13</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />





         <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body14_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body14</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />




            

       <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body15_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body15</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />







         <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body16_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body16</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />






       <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body17_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body17</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />






       <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body18_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body18</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />





              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter video URL (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Author name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="conclusion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conclusion</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your conclusion here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" story={story} handleChange={handleChange} handleSubmit={handleSubmit} disabled={loading} >
                {loading ? (isEditing ? "Updating..." : "Submitting...") : (isEditing ? "Update Story" : "Create Story")}
              </Button>
            </form>
          </Form>

          </div>
        </div>

        {/* Sidebar - Stories List */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "2px solid #e5e7eb" }}>
              All Stories
            </h2>
            {storiesLoading ? (
              <p style={{ textAlign: "center", color: "#6b7280", padding: "2rem" }}>Loading stories...</p>
            ) : stories.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6b7280", padding: "2rem" }}>No stories found.</p>
            ) : (
              <div className={styles.storiesList}>
                {stories.map((story) => (
                  <div
                    key={story._id}
                    className={`${styles.storyItem} ${editingStory?._id === story._id ? styles.storyItemActive : ""}`}
                    onClick={() => handleEdit(story)}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", marginBottom: "0.25rem", fontSize: "0.95rem" }}>
                        {stripHtml(story.title) || "Untitled Story"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                        Post #: {story.post_number || "N/A"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                        Slug: {story.slug || "N/A"}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {story.published ? (
                          <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "500" }}>● Published</span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: "500" }}>● Draft</span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(story);
                        }}
                        size="sm"
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Enable Edit
                      </Button>
                      {!story.published && (
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePublish(story._id);
                          }}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Publish
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}

export default Admin;

