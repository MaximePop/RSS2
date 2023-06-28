const groupID = '2485348'; // Replace with your Zotero group ID
const fetch = require('node-fetch');
const fs = require('fs');

// Make a GET request to fetch the group data
fetch(`https://api.zotero.org/groups/${groupID}/items/top`)
  .then(response => response.json())
  .then(data => {
    // Extract the collection IDs for each item
    const items = data.map(item => {
      return {
        itemID: item.key.replace(`https://www.zotero.org/groups/${groupID}/initiative_digit_hum/items/`, ''),
        collectionIDs: item.data.collections
      };
    });

    // Save the collection IDs to a text file
    const filePath = 'collection_ids.txt';
    const content = items.map(item => `${item.itemID}: ${item.collectionIDs.join(', ')}`).join('\n');

    fs.writeFile(filePath, content, err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Collection IDs saved to:', filePath);
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
