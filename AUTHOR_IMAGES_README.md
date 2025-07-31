# Author Images Setup

This document explains how to add author images to your blog posts.

## How it works

The blog system automatically displays author images from your Cloudinary Authors folder. When a blog post has an author name, the system looks for a matching image in the Cloudinary Authors folder.

## Current Setup

- **Cloudinary Cloud Name**: `dbj8h56jj`
- **Authors Folder**: `Authors/` in your Cloudinary account
- **Helper File**: `app/helpers/authorImages.js`

## Current Authors

1. **Oz Jason**
   - Cloudinary Path: `Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`
   - Matches: "oz", "jason", "oz jason"

## How to Add New Authors

### Step 1: Upload Author Image to Cloudinary

1. Go to your Cloudinary dashboard
2. Navigate to the `Authors` folder
3. Create a new folder with the author's name (e.g., `Authors/JohnDoe/`)
4. Upload the author's image to this folder
5. Note the exact filename of the uploaded image

### Step 2: Update the Helper File

Edit `app/helpers/authorImages.js` and add the new author mapping:

```javascript
const AUTHOR_IMAGES = {
  // Existing authors...
  'oz': `${CLOUDINARY_BASE}/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`,
  
  // Add new author here (replace with actual folder name and image filename)
  'john': `${CLOUDINARY_BASE}/Authors/JohnDoe/john-image.jpg`,
  'john doe': `${CLOUDINARY_BASE}/Authors/JohnDoe/john-image.jpg`,
  
  // Default fallback
  'default': `${CLOUDINARY_BASE}/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png`
};
```

**Important**: Replace `JohnDoe` with your actual folder name and `john-image.jpg` with your actual image filename.

### Step 3: Test the Implementation

1. Create a blog post with the new author name
2. The author image should automatically appear in the blog post

## File Structure

```
Authors/
├── Oz Jason/
│   └── Oz_Jason_Trimmed_ftxf1x.png
├── JohnDoe/
│   └── john-image.jpg
├── JaneSmith/
│   └── jane-profile.jpg
└── [Your New Author]/
    └── [author-image.jpg]
```

## Example: Adding "Sarah Johnson"

1. **Create folder**: `Authors/SarahJohnson/`
2. **Upload image**: `Authors/SarahJohnson/sarah-profile.jpg`
3. **Add to helper**:
   ```javascript
   'sarah': `${CLOUDINARY_BASE}/Authors/SarahJohnson/sarah-profile.jpg`,
   'sarah johnson': `${CLOUDINARY_BASE}/Authors/SarahJohnson/sarah-profile.jpg`,
   ```

## Notes

- Author names are matched case-insensitively
- Partial matches work (e.g., "john" will match "John Doe")
- If no match is found, the default image is used
- Images should be square or circular for best display
- Recommended image size: 200x200 pixels or larger

## Troubleshooting

1. **Image not showing**: Check the Cloudinary URL is correct
2. **Wrong image showing**: Check the author name matching in the helper file
3. **Default image showing**: Verify the author name in your blog post matches the mapping 