import { Box } from '@mui/material'


const UserImage = ({image, size ="60px"})=>{
   return (
    <Box width={size} height={size}>
      <img
        style={{
            objectFit: "cover",        
        }}    
          borderradius="50%"
            width= {size}
            src={`http://localhost:3002/assets/${image}`}
         />
    </Box>
   ) 
}

export default UserImage