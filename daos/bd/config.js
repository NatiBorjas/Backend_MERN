const {initializeApp} = require('firebase/app')


const firebaseConfig = {

	type: "service_account",
	projectId: "ecommerce-28",
	project_id: "ecommerce-28",
	private_key_id: "29789f2da3155d4559c5e9da4f01aab1c8cee584",
	private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXn6eQsU0MiHT8\nVwwo+nppiJ7QQaurYaNlzm8qxSpGV8Ps2FXt9EEaos/qcSw2zfvokVuFEPCeu1mF\nCgB9/s+kny3lWuWh212viLH+EUf7qtbK7xEJVKPp4urQ4HBmc47yR65rP04hkzFi\no4XwqgUWp3bBo2fXvtd9k4qAAOLrTRQSmpWiYyxEV5TqP1cdVti6dAwpPEtSa2Z7\npWnrM9Q5D0aXEf5ZLb86W0mu3qZ+TMOmOo9RTVy7hsQ5mmGnkAEjhdsVAXsoFGwN\n0luijlNDVdDPUYgEzMkwY6dNMJEnUu1rP53Pu4pUEy6/7QzoWnEEj3FrHFwcv3z9\nwOHJ7IVhAgMBAAECggEADTVGNo+LY7UbY8P9djBjq3/QPdoKp1JJFpxGCNbGGPya\nP66UxbbKWRSnwgd7z4ZgFGFdNJlGLL2rTbCSXGdvFSscp2ckq9XdMmZZAwXkXGME\ndQcgV8y8vqoaxHlYsUQNxsNByWvpVXlqCuqtx0o4SUHrUXD3oc6pHPJWVVI+cjrR\nVYeYoZzWImzYz6104yHRfHVMQGEmIv+Hx3Df/ljZ6JeAbShmeJZ4eJ2svt1OVSAV\n1NukwKqyy61ppP93Kj7dvWPNvp6Q/Zd/dVPVX30ag2WXks45fyrcS47Rkxb6eFff\nMcnT6uTN2tNNQkfKWumn1OSMbX7PgNFlOSxKuR/z9QKBgQDLy5Xk9SaEt96tWhiQ\nT2RDWbsLx0f821Fw2S9Vm7H82FqbmbruFpJ32KKWzBPT2wlINSICAgP18RWXWRhY\nk2RaWao2YbIpj+GfMWeTMjeYcvdHOQMQUg3dWinxcan+7l39z3S4WpEWw7H2OGX9\n8tYmUMOS+O/sg6xv7ginDOqybwKBgQC+dscSG52c9FNziOAJRyrU810t3cndAnvQ\nSG9g484PdF9sZ/scO7+ZCL/bcXm9lncNRNDpq1N4Wg9ckeVaHsvqZeHH1lEsuk0H\nvuX51vWl2byGygSOJW8sHuiKlvAxTj28AuHS0OyJX6FLpo4/2X2IPr45BhhNWxAt\n55u3BSvtLwKBgQDG4QKC0YqpchZo7ceS7SdXYrXapLtn01AC5LAAx1RG/4xM1RVL\nS9PcCRmCN94RnWvNf6yUcQsUdBUyAcx0hEImueIV9/k5/iOci0Ycq6D9sRQH+Wc4\nAhttrJPJ/7Z6BnzLOC0by6ZTpN6C/j7qOJUsBx0UzMK2+TjKcm0XOM/BGQKBgEz9\nvqL3PtM/gKxnXAjkF9BVQAlWak9IvbwIS92iuJ1OsXQk5EEZde3qt4OBb3DP7fgT\nJVAPzYINBcCpyUiQwmVSId6iJ9YoyRKkfFpuJoaQacEi0IyVXUc8h0vej+Geex4R\nHDAX/EXbvlvSTBZLWI9GraZnbFN4yCWGRk/Ja2RJAoGBAIJWDUsW7E4BckQFsdpg\nae3gGMch3RuQUomQLoz/j6n4OXrRPyHE0c9h7BXs0C+NL0Nqfnn/FCXuq7Yy8Qtz\n0rtK+RwF7QJDwujFrLGF+qSKKFxNSwNJu/6Cl1caLwiDYzABo6OwRy6rfPZS92zy\nLI3TX/0f5YxYpz6tfi1u3McT\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-rmxfu@ecommerce-28.iam.gserviceaccount.com",
	client_id: "105864651689049824428",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rmxfu%40ecommerce-28.iam.gserviceaccount.com"
	// type: process.env.APP_TYPE,
	// "project_id": "ecommerce-28",
	// "private_key_id": "29789f2da3155d4559c5e9da4f01aab1c8cee584",
	// "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXn6eQsU0MiHT8\nVwwo+nppiJ7QQaurYaNlzm8qxSpGV8Ps2FXt9EEaos/qcSw2zfvokVuFEPCeu1mF\nCgB9/s+kny3lWuWh212viLH+EUf7qtbK7xEJVKPp4urQ4HBmc47yR65rP04hkzFi\no4XwqgUWp3bBo2fXvtd9k4qAAOLrTRQSmpWiYyxEV5TqP1cdVti6dAwpPEtSa2Z7\npWnrM9Q5D0aXEf5ZLb86W0mu3qZ+TMOmOo9RTVy7hsQ5mmGnkAEjhdsVAXsoFGwN\n0luijlNDVdDPUYgEzMkwY6dNMJEnUu1rP53Pu4pUEy6/7QzoWnEEj3FrHFwcv3z9\nwOHJ7IVhAgMBAAECggEADTVGNo+LY7UbY8P9djBjq3/QPdoKp1JJFpxGCNbGGPya\nP66UxbbKWRSnwgd7z4ZgFGFdNJlGLL2rTbCSXGdvFSscp2ckq9XdMmZZAwXkXGME\ndQcgV8y8vqoaxHlYsUQNxsNByWvpVXlqCuqtx0o4SUHrUXD3oc6pHPJWVVI+cjrR\nVYeYoZzWImzYz6104yHRfHVMQGEmIv+Hx3Df/ljZ6JeAbShmeJZ4eJ2svt1OVSAV\n1NukwKqyy61ppP93Kj7dvWPNvp6Q/Zd/dVPVX30ag2WXks45fyrcS47Rkxb6eFff\nMcnT6uTN2tNNQkfKWumn1OSMbX7PgNFlOSxKuR/z9QKBgQDLy5Xk9SaEt96tWhiQ\nT2RDWbsLx0f821Fw2S9Vm7H82FqbmbruFpJ32KKWzBPT2wlINSICAgP18RWXWRhY\nk2RaWao2YbIpj+GfMWeTMjeYcvdHOQMQUg3dWinxcan+7l39z3S4WpEWw7H2OGX9\n8tYmUMOS+O/sg6xv7ginDOqybwKBgQC+dscSG52c9FNziOAJRyrU810t3cndAnvQ\nSG9g484PdF9sZ/scO7+ZCL/bcXm9lncNRNDpq1N4Wg9ckeVaHsvqZeHH1lEsuk0H\nvuX51vWl2byGygSOJW8sHuiKlvAxTj28AuHS0OyJX6FLpo4/2X2IPr45BhhNWxAt\n55u3BSvtLwKBgQDG4QKC0YqpchZo7ceS7SdXYrXapLtn01AC5LAAx1RG/4xM1RVL\nS9PcCRmCN94RnWvNf6yUcQsUdBUyAcx0hEImueIV9/k5/iOci0Ycq6D9sRQH+Wc4\nAhttrJPJ/7Z6BnzLOC0by6ZTpN6C/j7qOJUsBx0UzMK2+TjKcm0XOM/BGQKBgEz9\nvqL3PtM/gKxnXAjkF9BVQAlWak9IvbwIS92iuJ1OsXQk5EEZde3qt4OBb3DP7fgT\nJVAPzYINBcCpyUiQwmVSId6iJ9YoyRKkfFpuJoaQacEi0IyVXUc8h0vej+Geex4R\nHDAX/EXbvlvSTBZLWI9GraZnbFN4yCWGRk/Ja2RJAoGBAIJWDUsW7E4BckQFsdpg\nae3gGMch3RuQUomQLoz/j6n4OXrRPyHE0c9h7BXs0C+NL0Nqfnn/FCXuq7Yy8Qtz\n0rtK+RwF7QJDwujFrLGF+qSKKFxNSwNJu/6Cl1caLwiDYzABo6OwRy6rfPZS92zy\nLI3TX/0f5YxYpz6tfi1u3McT\n-----END PRIVATE KEY-----\n",
	// "client_email": "firebase-adminsdk-rmxfu@ecommerce-28.iam.gserviceaccount.com",
	// "client_id": "105864651689049824428",
	// "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	// "token_uri": "https://oauth2.googleapis.com/token",
	// "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	// "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rmxfu%40ecommerce-28.iam.gserviceaccount.com"


	// apiKey: process.env.REACT_APP_APIKEY,
	// authDomain: process.env.REACT_APP_AUTHDOMAIN,
	// projectId: process.env.REACT_APP_PROJECTID,
	// storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	// messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	// appId: process.env.REACT_APP_APPID
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
module.exports = {firebaseConfig , app}
// module.exports = app


