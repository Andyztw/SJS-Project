
//path names of domain and api paths to reach backend server

//path of the domain host address
//export const url = "http://localhost:8900/";

//export const url = "/";

export const url = "https://www.nzbeta.com/";

//path to the signin api call
export const signIn = 'api/v1/users/signin';

//path to the add API call
export const addApi = 'api/v1/apis/add_api';

//path to the run all API test call
export const runAll = 'api/v1/apis/run_all';

//path to the run selected API test call
export const runSelect = "api/v1/apis/run_selected";

//path to the lock/unlock the selected API call
export const lockInvert = 'api/v1/apis/invert_lock';

//path to the save edited API call
export const editApi = 'api/v1/apis/edit_api'; 

//path to the retrieve API test dashboard data call
export const dashBoard = 'api/v1/dashboard';

//set the name of the token for storage purposes
const tokenName = 'jwtToken';

//a shared funcitons to storing the JwtToken for database access.
export function getAccessToken(){

    //you can change the way the app store the token, per session base or until logout
    return localStorage.getItem(tokenName)
    //return sessionStorage.getItem(tokenName)
}

//in this function you can change the way the JWT Token is stored.
export function saveAccessToken(token){
    //either local or session or other customized ways
    localStorage.setItem(tokenName, token)
    //or session if needed
    //sessionStorage.setItem(tokenName, token)
}

//clearing the token from application 
export function clearToken(){
    //local storage 
    localStorage.removeItem(tokenName)
    //or session storage
    //sessionStorage.removeItem(tokenName)
}


