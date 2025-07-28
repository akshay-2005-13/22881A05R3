import React, { useState } from 'react';

const URLShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [message, setMessage] = useState('');

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic URL validation
    try {
      new URL(longUrl);
    } catch {
      setMessage('Please enter a valid URL.');
      return;
    }

    let code = shortcode.trim() || generateRandomCode();

    // Check if shortcode is already in use
    const existing = localStorage.getItem(code);
    if (existing) {
      setMessage(`Shortcode "${code}" already exists. Choose another.`);
      return;
    }

    const expiresAt = validity
      ? Date.now() + parseInt(validity) * 60000
      : null;

    const data = {
      longUrl,
      createdAt: Date.now(),
      expiresAt,
    };

    localStorage.setItem(code, JSON.stringify(data));

    setMessage(`✅ Short URL created: ${window.location.origin}/${code}`);

    // Log event
    console.log(`Created short URL for "${longUrl}" with code "${code}"`, data);

    // Reset form
    setLongUrl('');
    setValidity('');
    setShortcode('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2> URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Long URL *</label><br />
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com"
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Optional Validity (minutes)</label><br />
          <input
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            placeholder="Leave blank for no expiry"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Optional Shortcode</label><br />
          <input
            type="text"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            placeholder="e.g., mylink123"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>Create Short URL</button>
      </form>

      {message && (
        <p style={{ marginTop: '15px', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default URLShortenerForm;
