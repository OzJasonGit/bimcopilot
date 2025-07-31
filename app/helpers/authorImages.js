// Author Images Helper
// This file manages author images from Cloudinary Authors folder

// Cloudinary base URL
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dbj8h56jj/image/upload';

// Author image mappings
const AUTHOR_IMAGES = {
  // Oz Jason - main author
  'oz': `${CLOUDINARY_BASE}/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`,
  'jason': `${CLOUDINARY_BASE}/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`,
  'oz jason': `${CLOUDINARY_BASE}/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`,
  
  // Add more authors here following the folder structure:
  // 'author name': `${CLOUDINARY_BASE}/Authors/AuthorName/author-image.jpg`,
  // 'john doe': `${CLOUDINARY_BASE}/Authors/JohnDoe/john-image.jpg`,
  // 'jane smith': `${CLOUDINARY_BASE}/Authors/JaneSmith/jane-image.jpg`,
  
  // Default fallback
  'default': `${CLOUDINARY_BASE}/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`
};

/**
 * Get author image URL from Cloudinary based on author name
 * @param {string} authorName - The name of the author
 * @returns {string} - The Cloudinary URL for the author's image
 */
export const getAuthorImage = (authorName) => {
  if (!authorName) return AUTHOR_IMAGES.default;
  
  // Clean the author name and convert to lowercase for matching
  const cleanAuthorName = authorName.toLowerCase().trim();
  
  // Try to find a match in the author images mapping
  for (const [key, imageUrl] of Object.entries(AUTHOR_IMAGES)) {
    if (key === 'default') continue; // Skip default in the loop
    
    if (cleanAuthorName.includes(key)) {
      return imageUrl;
    }
  }
  
  // Return default image if no match found
  return AUTHOR_IMAGES.default;
};

/**
 * Get all available author names
 * @returns {string[]} - Array of available author names
 */
export const getAvailableAuthors = () => {
  return Object.keys(AUTHOR_IMAGES).filter(key => key !== 'default');
};

/**
 * Add a new author image mapping
 * @param {string} authorName - The author name to match
 * @param {string} imageUrl - The Cloudinary URL for the author's image
 */
export const addAuthorImage = (authorName, imageUrl) => {
  if (authorName && imageUrl) {
    AUTHOR_IMAGES[authorName.toLowerCase()] = imageUrl;
  }
};

export default getAuthorImage; 