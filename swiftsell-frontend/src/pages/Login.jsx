import Form from "../components/Form"

function Login() {
    return (
    
    <div>
    <Form route="api/token/" method="login" />
    
    <a className="form-a" href="/register">don't have an account</a>
    </div>
)}

export default Login