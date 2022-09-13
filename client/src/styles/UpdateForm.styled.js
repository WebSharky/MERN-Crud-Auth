import styled from 'styled-components'

export const StyledUpdateForm = styled.div`
    background-color: rgb(128,201,156, 0.5);
    border-radius: 15px;
    padding: 1rem;
    display: flex;
    margin-left: 1rem;
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