import styled from 'styled-components'

export const StyledExcerpt = styled.div`
   padding: 2rem 3rem;
   margin: 1rem;
   background-color: rgba(42, 186, 172, 0.1);
   background: linear-gradient(142deg, rgb(183,234,246, 0.3) 33%, rgba(252,70,107,0.01) 77%);
   border-radius: 20px;
   max-width: 50%;

   @media (max-width: 768px) {
    max-width: 96%;
  }

   a {
    color: red;
    text-decoration: none;
   }
   button {
    background: linear-gradient(142deg, rgba(63,94,251,1) 0%, rgba(252,70,107,0.05085784313725494) 77%);
    transition-duration: 500ms;
        border-radius: 20px;
        border: none;
        padding: 1rem;
        cursor: pointer;
      
    } 
    button:hover {
        background-color: #fc466b;
        color: white;
    }

    hr {
        color: #34abeb;
    }

    .flex {
        display: flex;
        gap: 1rem;
    }

`