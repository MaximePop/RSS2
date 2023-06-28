// Import the Axios library for making HTTP requests
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Replace `YOUR_API_KEY` with your Zotero API key
const apiKey = 'yQraJQogHA89BHu3VJBKXLha';

// Replace `YOUR_COLLECTION_KEY` with the key of the Zotero collection you want to export
const collectionKey = '8PHW6BAG';

// Replace `YOUR_USER_ID` with your Zotero user ID
const userId = '9668586';

// URL of the Zotero API to access your personal library
const apiUrl = `https://api.zotero.org/users/${userId}/collections/${collectionKey}/items`;

// Make a GET request to retrieve the references in the collection
axios
  .get(apiUrl, {
    params: {
      key: apiKey,
    },
  })
  .then((response) => {
    const items = response.data;

    // Generate an HTML page for each reference
    items.forEach((item) => {
      const title = item.data.title;
      const author = item.data.creators && item.data.creators.length > 0 ? item.data.creators[0].name : 'Unknown';
      const year = item.data.date;

      // Generate the HTML content for each reference
      const htmlContent = `
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Year:</strong> ${year}</p>
        <!-- Add other metadata and HTML tags as needed -->
      `;

      // Create an HTML file for each reference
      // You can customize the file name and save location
      const fileName = `${title.replace(/\s+/g, '_')}.html`;
      const filePath = path.join('C:\\Users\\Maxime\\Desktop\\Rendu\\test', fileName);
      const fileContent = `<!DOCTYPE html><html><body>${htmlContent}</body></html>`;

      // Save the HTML file
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error('An error occurred while saving the HTML file:', err);
        } else {
          console.log(`Saved HTML file: ${fileName}`);
        }
      });
    });
  })
  .catch((error) => {
    console.error('An error occurred while retrieving Zotero references:', error);
  });
