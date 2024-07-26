import { useContext } from "react"
import ContextoUser from "../contexts/UserContext"

const useUser = () => useContext(ContextoUser)
export default useUser
