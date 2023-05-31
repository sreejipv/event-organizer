import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {

  // Retrieve the token from the cookie
  const token = context.req.cookies.token;

  // Decode the token to check if the user is logged in
  let isSignedIn = false;
  if (token) {
    try {
      const decodedToken = jwt.decode(token);
      isSignedIn = decodedToken ? true : false;
    } catch (err) {
      console.log(err);
    }
  }

  return { props: { isloggedIn: isSignedIn,  isSignedIn: isSignedIn } };
}
