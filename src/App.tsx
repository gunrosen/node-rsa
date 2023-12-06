import {Buffer} from 'buffer';
import React, {useCallback, useState} from 'react';
import './App.css';
const crypto = require('crypto')

function App() {
    const [error, setError] = useState('')
    const [publicKey, setPublicKey] = useState('-----BEGIN RSA PUBLIC KEY-----\n' +
        'MIIBCgKCAQEAq9LQ5bfIipxzzEeBwIxikxZXnB1ms+G9o64dknOyliqn+eZgKT3V\n' +
        'SwHTloRyJdnQyVBXu+cx6Z36/G/0ntTOPagrZpJi5j9W/pajwqzLn2bmBbbI0Kr4\n' +
        'AqlKpmXT8x/i1ZU9i+Nh2PT4b0LaFYMXsFbRWAv8m/rICUkR4ZjLeVn6K0XluRqr\n' +
        'SJb9orktkOFhEnava07rQdxvSpiBd06lLRnF16fhTDJVpkEp4tlDoYWkqvqHRMzB\n' +
        'H00PecRSJ/UilUCC6KczgIqQ1p9GmznZOLgYn20qLyba78EOMcXmA/qZReKrslqk\n' +
        '1mN73X8kCcK7aNsYB/2NkbMCAqKBdm4QUwIDAQAB\n' +
        '-----END RSA PUBLIC KEY-----')
    const [data, setData] = useState('32d84a46b64f01b61267973439f8beec82b5119a4bb31b39f7229baf28f8f7d8')
    const [encryptData, setEncryptData] = useState('')

    const debounceInput = useCallback((func: Function) => {
        setTimeout(
            func(),
            100
        )
    }, [])

    const encrypt = () => {
        setError('')
        if (!publicKey) {
            setError('Public key must be filled')
            return
        }
        if (!data) {
            setError('Data must be filled')
            return
        }
        try {
            debugger
            const encryptedData = crypto.publicEncrypt(
                {
                    key: publicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                // We convert the data string to a buffer using `Buffer.from`
                Buffer.from(data)
            )
            console.log("encypted data: ", encryptedData.toString("base64"));
            setEncryptData(encryptedData.toString("base64"))
        } catch (e: any) {
            setError(e.message)
        }
    }
    return (
        <div className="App">
            <div><h2><strong>RSA encrypt</strong></h2></div>
            <br/>
            <label>Enter RSA public key</label>
            <textarea value={publicKey} placeholder={'Enter RSA public key'}
                      onChange={e => debounceInput(() => setPublicKey(e.target.value))}
                      rows={10}
                      cols={80}
            />
            <br/>
            <label>Enter data</label>
            <textarea value={data} placeholder={'Enter data'}
                      onChange={e => debounceInput(() => setData(e.target.value))}
                      rows={10}
                      cols={80}
            />

            <br/>
            <button onClick={encrypt}>Click</button>
            <br/>
            <div className="error">{error}</div>
            <div className="result">{encryptData}</div>
        </div>
    );
}

export default App;
