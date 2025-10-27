import React from 'react'

export default function Footer() {
  return (
    <footer style={{ 
                padding: '10px', 
                textAlign: 'center', 
                borderTop: '1px solid #eee', 
                fontSize: '0.8em', 
                color: '#666' 
            }}>
                © {new Date().getFullYear()} POS SaaS. Hak Cipta Dilindungi.
            </footer>
  )
}
