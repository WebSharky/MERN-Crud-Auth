import styled from 'styled-components'

export const StyledArticle = styled.article`
   padding: 1rem;
   background-color: white;
   box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.5);
   max-width: 1200px;
   margin: 2rem 0rem;
   border-radius: 20px;
   position: relative;
   overflow: hidden;
   transition-duration: 350ms;


   &:hover{
      box-shadow: 5px 5px 5px 4px rgba(128,201,156, 0.6);
      transform: scale(1.03);
   }
   
   @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.1rem

  }



   img {
      border-radius: 20px;
      object-fit: fill;
      height: auto;
      max-width: 100%;
     
   }
   .image {
      height: auto;
      width: 40%;
     
     @media (max-width: 768px) {
      width: auto;
      padding: .3rem
  }
   }
   img:before {
    content: ' ';
    border-radius: 20px;
    
    height: 150px;
    width: 300px;
      position: absolute;
      object-fit: cover;
    /* background-image: url('https://www.atpine.com.au/wp-content/uploads/2016/12/no-image-available.jpg'); */
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAh8YVQhMCGhp1xDo9Pew7q0W4H1zLD-9wbA&usqp=CAU');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;

  
}
.gradientCircle{
background: radial-gradient(circle, rgba(107, 191, 139,0.23209033613445376) 3%, rgba(255,255,255,0.053658963585434205) 70%);
height: 20vh;
width: 20vh;
position: absolute;
top: -40px;
right: -20px;
transform: scale(2);

}

.shortTitle{
   -webkit-transform: rotate(90deg);
-moz-transform: rotate(90deg);
-o-transform: rotate(90deg);
-ms-transform: rotate(90deg);
transform: rotate(90deg);
background: linear-gradient(142deg, rgba(63,94,251,1) 0%, rgba(252,70,107,0.05085784313725494) 77%);
background-color: #fc466b;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(50%) rotate(90deg);


  @media (max-width: 768px) {
     display: none;
  }

}



`