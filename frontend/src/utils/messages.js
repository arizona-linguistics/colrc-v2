import { toast } from "react-toastify";

export function broadCastError(errorMessage) {
  toast.error(errorMessage);
}

export function broadCastSuccess(successMessage) {
  toast.success(successMessage);
}

export function handleErrors(error, action) {
  const { graphQLErrors, networkError } = error;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message.includes("JWTExpired")) {
        toast.error(`Whoops!  You have an old login.  Logging you out now`);
        if (action && action.logout) {
          action.logout.action();
        }
      } else {
        toast.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      }
    });

  if (networkError) toast.error(`[Network error]: ${networkError}`);

  // Assume you have a string message
  if (typeof error === "string") {
    broadCastError(error);
  }
}
