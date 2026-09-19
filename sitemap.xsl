<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/2001/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Sitemap - PreToMains Notes &amp; Materials</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #F8FAFC;
            color: #0F172A;
            margin: 0;
            padding: 0;
          }
          .header {
            background: linear-gradient(135deg, #09090B 0%, #18181B 60%, #DC2626 100%);
            color: #FFFFFF;
            padding: 2.5rem 1.5rem;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 0.5rem 0;
            font-size: 2rem;
            font-weight: 800;
          }
          .header p {
            margin: 0;
            font-size: 1rem;
            color: #CBD5E1;
          }
          .container {
            max-width: 960px;
            margin: -1.5rem auto 3rem auto;
            padding: 0 1rem;
          }
          .card {
            background: #FFFFFF;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            border: 1px solid #E2E8F0;
            overflow: hidden;
            padding: 1.5rem;
          }
          .info-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #E2E8F0;
            font-size: 0.9rem;
            color: #64748B;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
          }
          th {
            background-color: #FEF2F2;
            color: #DC2626;
            text-align: left;
            padding: 0.75rem 1rem;
            font-weight: 700;
          }
          td {
            padding: 0.85rem 1rem;
            border-bottom: 1px solid #F1F5F9;
          }
          tr:hover td {
            background-color: #FFF5F5;
          }
          a {
            color: #DC2626;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-badge {
            background: #09090B;
            color: #FFFFFF;
            padding: 0.2rem 0.55rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 700;
          }
          .footer {
            text-align: center;
            margin-top: 2rem;
            font-size: 0.85rem;
            color: #94A3B8;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>PreToMains XML Sitemap</h1>
          <p>Index of indexed pages and study material resources for search engines</p>
        </div>
        <div class="container">
          <div class="card">
            <div class="info-bar">
              <div>Total URLs in sitemap: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></div>
              <div><a href="https://pretomains.github.io/">Back to Main Website &rarr;</a></div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>URL Location</th>
                  <th>Priority</th>
                  <th>Change Frequency</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="priority-badge"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                    <td><xsl:value-of select="sitemap:changefreq"/></td>
                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <div class="footer">
            &copy; PreToMains Notes &amp; Materials - Official Website of @pretomains YouTube Channel
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
