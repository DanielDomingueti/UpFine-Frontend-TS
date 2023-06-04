// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
// import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import { getEmpresaData, postData } from '@/utils/FetchAPI';
 
const inter = Inter({ subsets: ['latin'] })

interface Empresa {
  id: number;
  cnpj: string;
  name: string;
}

export default function Home () {
  const [mockEmpresas, SetMockEmpresas] = useState<Empresa[]>([
    {
      "id": 1,
      "cnpj": "08.827.501/0001-58",
      "name": "AEGEA SANEAMENTO 1"
    },
    {
      "id": 2,
      "cnpj": "08.827.501/0001-58",
      "name": "AEGEA SANEAMENTO 2"
    },
    {
      "id": 3,
      "cnpj": "08.827.501/0001-58",
      "name": "AEGEA SANEAMENTO 3"
    },
    {
      "id": 4,
      "cnpj": "08.827.501/0001-58",
      "name": "AEGEA SANEAMENTO 4"
    },
  ])
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState<Empresa[]>([]);
  const [email, setEmail] = useState('');

  const fetchData = async () => {
    const result = await getEmpresaData();
    SetMockEmpresas(result)
  }

  useEffect(() => {
    fetchData()
  }, []);



  const handleEmpresaClick = (empresa: Empresa) => {
    const empresaJaSelecionada = empresasSelecionadas.find((emp) => emp.id === empresa.id);

    if (empresaJaSelecionada) {
      // Remove a empresa da lista de selecionadas
      const novaLista = empresasSelecionadas.filter((emp) => emp.id !== empresa.id);
      setEmpresasSelecionadas(novaLista);
    } else {
      // Adiciona a empresa à lista de selecionadas
      const novaLista = [...empresasSelecionadas, empresa];
      setEmpresasSelecionadas(novaLista);
    }
  };
  
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(`E-mail cadastrado: ${email}`);
    console.log('Empresas selecionadas', empresasSelecionadas);
    const corporationIds = empresasSelecionadas.map((empresa) => empresa.id);
    const payload = {
      email: email,
      corporationIds: corporationIds
    }
    console.log(payload);
    postData(payload)
    setEmail('');
  };


  return (
    <>
      <Header/>
      <main>
        <section id='box-empresas'>
          {mockEmpresas.map((empresa) => (
            <div 
              className={`card ${empresasSelecionadas.includes(empresa) ? 'selected' : ''}`}
              key={empresa.id}
              onClick={() => handleEmpresaClick(empresa)}
            >
              <FontAwesomeIcon icon={faFloppyDisk} className='icon' />
              <p className='empresa-name'>{empresa.name}</p>
            </div>
          ))}
        </section>
        <section id='box-cadastro' className='cadastro-section'>
          <h1 className='cadastro-title'>Receba informações incriveis!</h1>
          <form onSubmit={handleSubmit} className="formulario">
            <label htmlFor="emailInput" className="label-email">
              E-mail:
            </label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input-email"
              required
            />
            <button type="submit" className="botao-cadastrar">
              Cadastrar
            </button>
          </form>
        </section>
      </main>
    </>
  )
}
