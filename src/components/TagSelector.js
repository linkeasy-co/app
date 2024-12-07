import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import '../styles/TagSelector.scss';

const TagSelector = ({ selectedTags, onChangeTags, onCreateTag }) => {
  const [theme, setTheme] = useState('light'); // Tema padrão como "light"

  useEffect(() => {
    // Recupera o tema do localStorage ao carregar o componente
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); // Rodar apenas ao montar o componente

  return (
    <CreatableSelect
      isMulti
      value={selectedTags}
      onChange={onChangeTags}
      onCreateOption={onCreateTag}
      placeholder="Digite e pressione Enter para adicionar uma tag"
      formatCreateLabel={(inputValue) => `Criar nova tag: "${inputValue}"`}
      styles={customStyles(theme)}  // Passando o tema para os estilos
    />
  );
};

const customStyles = (theme) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--accent-color)',
    borderColor: state.isFocused ? 'var(--accent-color)' : 'var(--edges-light-color)',
    borderRadius: '32px',
    color: 'var(--dark-gray)',
    padding: '12px',
    boxShadow: state.isFocused ? '0 0 0 2px var(--accent-color)' : 'none',
    maxWidth: '100%', // Limita a largura do componente
    width: '100%', // Adapta ao tamanho do contêiner
    '&:hover': {
      borderColor: 'var(--accent-dark)',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    opacity: 0.7,
  }),
  input: (provided) => ({
    ...provided,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--accent-color)',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--dark-gray)',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: 'var(--soft-white)',
    padding: '12px 16px',
    borderRadius: '24px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    textAlign: 'center',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'white',
        cursor: 'pointer'
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: theme === 'dark' ? 'var(--input-dark-bg)' : 'var(--input-bg)',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--accent-color)'
      : theme === 'dark'
        ? 'var(--input-dark-bg)'
        : 'var(--input-bg)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--accent-dark)',
    },
  }),
});


export default TagSelector;
