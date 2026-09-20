import Papa from 'papaparse';

export const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1ZVOmIGl5Z8VuBml6P1CTDmqm81ip7T2srx2j4D2pLJ0/edit?gid=1054593956#gid=1054593956';

/**
 * Converts a standard Google Sheet sharing URL or published web link to a CSV direct download URL.
 */
export const normalizeGoogleSheetUrl = (url) => {
  const targetUrl = url && url.trim() ? url.trim() : DEFAULT_SHEET_URL;

  // If already a pub?output=csv link or export link
  if (targetUrl.includes('output=csv') || targetUrl.includes('format=csv')) {
    return targetUrl;
  }

  // Handle standard edit/view links: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/...
  const matches = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (matches && matches[1]) {
    const sheetId = matches[1];
    // Check if gid is specified
    const gidMatch = targetUrl.match(/[?&#]gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : '1054593956';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  return targetUrl;
};

/**
 * Helper to extract YouTube video ID from various YouTube URL formats
 */
export const getYoutubeVideoId = (url) => {
  if (!url) return null;
  const cleanUrl = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);
  return (match && match[2] && match[2].length === 11) ? match[2] : null;
};

/**
 * Helper to convert Google Drive sharing links to direct viewable image URLs
 */
const formatImageLink = (url) => {
  if (!url || !url.trim()) return '';
  const cleanUrl = url.trim();

  // Convert drive.google.com open/file links to direct image preview
  const driveMatch = cleanUrl.match(/drive\.google\.com\/(?:open\?id=|file\/d\/)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return cleanUrl;
};

/**
 * Fetches CSV data from Google Sheet URL and maps columns to schema
 */
export const fetchGoogleSheetData = async (sheetUrl = DEFAULT_SHEET_URL) => {
  const csvUrl = normalizeGoogleSheetUrl(sheetUrl);

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet data (${response.status} ${response.statusText}). Make sure the sheet is public or shared via link.`);
  }

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          reject(new Error('The Google Sheet appears to be empty or misformatted.'));
          return;
        }

        // Map parsed row headers to our expected keys
        const formattedData = results.data.map((row, idx) => {
          // Helper to find value regardless of exact casing or space formatting
          const getValue = (possibleKeys, fallback = '') => {
            for (const key of possibleKeys) {
              const matchingRowKey = Object.keys(row).find(
                rk => rk.toLowerCase().replace(/[^a-z0-9]/g, '') === key.toLowerCase().replace(/[^a-z0-9]/g, '')
              );
              if (matchingRowKey && row[matchingRowKey] !== undefined && row[matchingRowKey] !== null) {
                const val = String(row[matchingRowKey]).trim();
                if (val !== '') return val;
              }
            }
            return fallback;
          };

          // Product ID logic
          const rawId = getValue(['Product_ID (Leave Blank)', 'Product_ID', 'ID', 'ProductId', 'Product_id'], '');
          const productId = rawId || `PTM-${idx + 1}`;

          // Price logic - if blank, missing, empty or 0, treat as free (Price = 0)
          const rawPrice = getValue(['Price_in_rupees', 'Price', 'Priceinrupees', 'Price_in_rs'], '');
          let numPrice = 0;
          if (rawPrice !== '') {
            const parsed = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));
            numPrice = isNaN(parsed) ? 0 : parsed;
          }

          // Ad / Affiliate column logic
          const adVal = getValue(['Ad', 'AD', 'ad', 'Is_Ad', 'IsAd', 'Affiliate', 'Ad_Item'], 'FALSE').toUpperCase();
          const isAd = ['TRUE', '1', 'YES', 'Y'].includes(adVal);

          // Featured logic
          const featuredVal = getValue(['featured', 'Is_Featured', 'Featured_Item', 'Featured'], 'FALSE').toUpperCase();
          const isFeatured = ['TRUE', '1', 'YES', 'Y', 'HOT'].includes(featuredVal) ? 'TRUE' : 'FALSE';

          // Video URL & YouTube Thumbnail auto-generation
          const videoUrl = getValue(['Video_URL', 'VideoURL', 'Video', 'Youtube_URL', 'Youtube_Link', 'Video_Link'], '');
          const videoId = getYoutubeVideoId(videoUrl);
          const videoThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

          // Image & Download links
          const rawImg = getValue(['Thumbnail', 'Image_Link', 'Image', 'Image_Url', 'Thumbnail_Url', 'Img'], '');
          const imageLink = videoThumbnail || formatImageLink(rawImg);

          const downloadLink = getValue(['Download_Link', 'download_link', 'Download', 'Link', 'PDF_Link', 'Drive_Link'], '#');

          return {
            Product_id: productId,
            Product_Title: getValue(['Product_Title', 'Title', 'ProductTitle', 'Name'], 'Untitled Note Material'),
            Product_Description: getValue(['Product_Description', 'Description', 'ProductDescription'], 'No description available for this study material.'),
            Price_in_rupees: numPrice,
            Image_Link: imageLink,
            Video_URL: videoUrl,
            download_link: downloadLink,
            featured: isFeatured,
            isAd: isAd
          };
        });

        resolve(formattedData);
      },
      error: (err) => {
        reject(new Error(`CSV Parsing error: ${err.message}`));
      }
    });
  });
};


