import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import estrelas from './estrelas.png'; // Ajuste o caminho conforme necessário

const CupomPage = () => {
  const { cupom } = useParams();
  const [cupomInfo, setCupomInfo] = useState({ codigo_cupom: cupom });
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCupomInfo({ codigo_cupom: cupom });
    setLoading(false);
  }, [cupom]);

  if (loading) {
    return <div style={styles.loading}>Carregando...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={estrelas} alt="Avaliação" style={styles.image} />
        <h2 style={styles.title}>Obrigado por nos avaliar!!</h2>
        <p style={styles.cupomText}>ESCANEIE O QR CODE ABAIXO E ADQUIRA UM SUPERDESCONTO POR NOS AVALIAR</p>
      </div>
      <div style={styles.qrCodeContainer}>
        <div style={styles.qrCodeFrame}>
          <QRCode value={`http://192.168.18.6:3000/cupom/${cupom}`} size={128} />
        </div>
      </div>
      <div style={styles.cupomInfo}>
        <p style={styles.cupomText}>CÓDIGO DO CUPOM: {cupomInfo.codigo_cupom}</p>
        <p style={styles.cupomText}>VALIDO APENAS 1 POR CPF</p>
        <a style= {styles.cupomText1} href="https://brayanburger.com.br/brayanburger" rel="noopener noreferrer">Visite nosso site para saber sobre mais promoções.</a>
        {hasError && <p style={styles.errorText}></p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px 20px',
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    height: 'auto',
    margin: '0 auto'
  },
  header: {
    marginBottom: '20px'
  },
  image: {
    width: '118px',
    height: 'auto',
  },
  title: {
    fontSize: '30px',
    color: '#b22222',
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 600,
    margin: '10px 0'
  },
  subtitle: {
    fontSize: '16px',
    fontFamily: "'Montserrat', sans-serif",
    color: '#555',
    margin: '10px 0'
  },
  qrCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  },
  qrCodeFrame: {
    padding: '10px',
    border: '4px solid black',
    borderRadius: '10px',
    backgroundColor: '#fff'
  },
  cupomInfo: {
    marginTop: '20px'
  },
  cupomText: {
    fontSize: '16px',
    color: '#333',
    fontWeight: 700,
    margin: '5px 0',
    margin: '20px 0'
  },
  errorText: {
    color: 'red',
    marginTop: '10px'
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#555',
    padding: '50px 0'
  },
  cupomText1: {
    fontSize: '16px',
    color: '#b22222',
    fontWeight: 700,
    margin: '5px 0',
    margin: '20px 0'
  }
};

export default CupomPage;
