import React, { useEffect, useState } from "react";

const URLStats = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const stats = [];

    allKeys.forEach((key) => {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.longUrl) {
          stats.push({
            shortcode: key,
            ...data,
          });
        }
      } catch (err) {
        console.error("Error parsing item", key, err);
      }
    });

    setUrls(stats);
  }, []);

  const formatDate = (ms) => {
    if (!ms) return "No Expiry";
    return new Date(ms).toLocaleString();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>📊 Shortened URL Statistics</h2>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        urls.map((item) => (
          <div key={item.shortcode} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
            <p><strong>🔗 Short Link:</strong> {window.location.origin}/{item.shortcode}</p>
            <p><strong>🌐 Original URL:</strong> {item.longUrl}</p>
            <p><strong>🕒 Expiry:</strong> {formatDate(item.expiresAt)}</p>

            <p><strong>👁️ Total Clicks:</strong> {item.clicks ? item.clicks.length : 0}</p>

            {item.clicks && item.clicks.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Timestamp</th>
                    <th style={thStyle}>Referrer</th>
                    <th style={thStyle}>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {item.clicks.map((click, idx) => (
                    <tr key={idx}>
                      <td style={tdStyle}>{new Date(click.timestamp).toLocaleString()}</td>
                      <td style={tdStyle}>{click.referrer || "Unknown"}</td>
                      <td style={tdStyle}>{click.location || "India"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "6px",
  textAlign: "left",
  backgroundColor: "#f4f4f4"
};

const tdStyle = {
  padding: "6px",
  borderBottom: "1px solid #eee"
};

export default URLStats;
