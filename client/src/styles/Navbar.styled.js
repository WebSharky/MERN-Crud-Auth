import styled from 'styled-components'

export const StyledNavbar = styled.div`
background-color: rgba(107, 191, 139, 0.80);
height: 40px;
width: auto;
transition-duration: 500ms;
display: flex;
justify-items: center;
padding: 5px 15px;
margin: 10px;
border-radius: 20px;

font-weight: bold;

.navUl{

    display: flex;
       gap: 1rem;
}

a {
    color: aliceblue;
    text-decoration: none;
    transition-duration: 600ms;
    transition-delay: 200ms;
    :hover{
        color: black;
    }
}

justify-content: center;
/* background-color: rgba(107, 191, 139, 0.5);
background-color: red; */
position: fixed; 

z-index:999; 


:hover{
    background-color: rgba(89, 93, 97, 0.7);
}

`