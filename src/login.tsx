import { Button } from "@mui/material"
import { useGoogleLogin } from "@react-oauth/google"

type TProps = {
    onSuccess: (token: string) => void
}

export const Login = ({onSuccess}: TProps) => {
    const login = useGoogleLogin({scope: 'https://www.googleapis.com/auth/cloud-platform', onSuccess: data => onSuccess(data.access_token)})
    return  <Button sx={{textTransform: "none"}} variant="contained" onClick={() => login()}>Войти с помощью гугл</Button>
}