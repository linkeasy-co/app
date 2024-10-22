import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

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
    backgroundColor: theme === 'true' ? 'var(--input-dark-bg)' : 'var(--input-bg)',
    borderColor: state.isFocused ? 'var(--accent-color)' : 'var(--edges-light-color)',
    color: theme === 'true' ? 'white' : 'black',
    padding: '8px',
    boxShadow: state.isFocused ? '0 0 0 2px var(--accent-color)' : 'none',
    '&:hover': {
      borderColor: 'var(--accent-dark)',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: theme === 'true' ? 'white' : 'black',
    opacity: 0.7,
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--accent-color)',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--accent-dark)',
      color: 'white',
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
