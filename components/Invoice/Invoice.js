import React, { useRef } from 'react';

const colors = {
  accent: '#2563eb',
  dark: '#18181b',
  light: '#ffffff',
  muted: '#f5f5f4',
  border: '#e5e7eb',
};

const Invoice = ({ orderNumber, date, buyer, products, total, onClose }) => {
  const invoiceRef = useRef();
  const taxRate = 0.0;
  const tax = total * taxRate;
  const grandTotal = total + tax;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container} ref={invoiceRef}>
        <header style={styles.header}>
          <h1 style={styles.title}>INVOICE</h1>
          <div style={styles.meta}>
            {orderNumber && <div><strong>Invoice No:</strong> #{orderNumber}</div>}
            {date && <div><strong>Date:</strong> {date}</div>}
          </div>
        </header>

        <section style={styles.infoSection}>
          <div>
            <h3 style={styles.label}>Invoice To</h3>
            {buyer?.name && <p>{buyer.name}</p>}
            {buyer?.email && <p>{buyer.email}</p>}
          </div>
        </section>

        <section style={styles.tableSection}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Item</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} style={i % 2 ? styles.trOdd : styles.trEven}>
                  <td>{p.title}</td>
                  <td style={styles.center}>{p.quantity}</td>
                  <td style={styles.right}>${p.price.toFixed(2)}</td>
                  <td style={styles.right}>${(p.price * p.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={styles.totals}>
          <div><span>Subtotal:</span><span>${total.toFixed(2)}</span></div>
          {tax > 0 && <div><span>Tax:</span><span>${tax.toFixed(2)}</span></div>}
          <div style={styles.total}><span>Total:</span><span>${grandTotal.toFixed(2)}</span></div>
        </section>

        <div style={styles.buttonRow}>
          <button onClick={() => window.print()} style={styles.btnPrimary}>Download as PDF</button>
          {onClose && <button onClick={onClose} style={styles.btnSecondary}>Close</button>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: colors.muted,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 64,
  },
  container: {
    background: colors.light,
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: 700,
    padding: 40,
    marginTop: 40,
    position: 'relative',
    zIndex: 2,
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    color: colors.accent,
    fontWeight: 800,
    letterSpacing: 1.2,
  },
  meta: {
    fontSize: 14,
    color: colors.dark,
    textAlign: 'right',
  },
  infoSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 32,
    marginBottom: 24,
    fontSize: 14,
  },
  label: {
    color: colors.accent,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
  },
  tableSection: {
    marginBottom: 24,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '8px',
    background: colors.dark,
    color: colors.light,
    borderBottom: `2px solid ${colors.accent}`,
  },
  trEven: {
    background: '#f8fafc',
  },
  trOdd: {
    background: '#ffffff',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  totals: {
    borderTop: `2px solid ${colors.border}`,
    paddingTop: 16,
    fontSize: 14,
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.accent,
    marginTop: 8,
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginTop: 24,
  },
  btnPrimary: {
    background: colors.accent,
    color: colors.light,
    border: 'none',
    padding: '10px 24px',
    borderRadius: 24,
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  },
  btnSecondary: {
    background: colors.muted,
    color: colors.accent,
    border: 'none',
    padding: '10px 24px',
    borderRadius: 24,
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  },
};

export default Invoice;
