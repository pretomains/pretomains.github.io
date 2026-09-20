<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #09090B;
            color: #F8FAFC;
            margin: 0;
            padding: 0;
          }
          .header {
            background: linear-gradient(135deg, #09090B 0%, #18181B 60%, #DC2626 100%);
            color: #FFFFFF;
            padding: 2.5rem 1.5rem;
            text-align: center;
            border-bottom: 2px solid #DC2626;
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
            margin: 2rem auto;
            padding: 0 1rem;
          }
          .card {
            background: #121217;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 1px solid #27272A;
            overflow: hidden;
            padding: 1.5rem;
          }
          .info-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #27272A;
            font-size: 0.9rem;
            color: #94A3B8;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
          }
          th {
            background-color: #18181B;
            color: #EF4444;
            text-align: left;
            padding: 0.75rem 1rem;
            font-weight: 700;
            border-bottom: 1px solid #27272A;
          }
          td {
            padding: 0.85rem 1rem;
            border-bottom: 1px solid #27272A;
            color: #E2E8F0;
          }
          tr:hover td {
            background-color: #1A1A22;
          }
          a {
            color: #EF4444;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-badge {
            background: #DC2626;
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
            color: #64748B;
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
              <div>Total URLs in sitemap: <strong><xsl:value-of select="count(/*[local-name()='urlset']/*[local-name()='url'])"/></strong></div>
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
                <xsl:for-each select="*[local-name()='urlset']/*[local-name()='url']">
                  <tr>
                    <td>
                      <a>
                        <xsl:attribute name="href">
                          <xsl:value-of select="*[local-name()='loc']"/>
                        </xsl:attribute>
                        <xsl:attribute name="target">_blank</xsl:attribute>
                        <xsl:value-of select="*[local-name()='loc']"/>
                      </a>
                    </td>
                    <td>
                      <span class="priority-badge"><xsl:value-of select="*[local-name()='priority']"/></span>
                    </td>
                    <td><xsl:value-of select="*[local-name()='changefreq']"/></td>
                    <td><xsl:value-of select="*[local-name()='lastmod']"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <div class="footer">
            &copy; PreToMains Notes &amp; Materials - Official Platform of @pretomains YouTube Channel
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
