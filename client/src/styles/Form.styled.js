import styled from 'styled-components'

export const StyledForm = styled.div`
    background-color: rgba(42, 186, 172,0.1);
    border-radius: 15px;
    box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.5);
    /* border: 2px #fc9d8d solid; */

    padding: 1rem;
    margin-top: 15px;
    display: flex;

    form {
        width: 100%;
        justify-content: center;
    }
   textarea, input {
        width: 100%;
        font-size: large;
        border-radius: 10px;
         
    } & :focus {
        background-color: aliceblue;
    } 
    label {
        color: black;
        line-height: 2rem;

    }
    div {
        width: 100%;
        margin-top: 1rem;
    }
    button {
        background: rgb(9,1,104);
        background: linear-gradient(142deg, rgba(9,1,104,1) 0%, rgba(1,154,233,0.06486344537815125) 69%, rgba(0,197,229,0.028448879551820738) 100%);
        padding: 0.5rem 2rem;
        transition-duration: 500ms;
        border-radius: 20px;
        border: none;
      
    } 
    button:hover {
        background-color: #019ae9;
        color: white;
    }
`