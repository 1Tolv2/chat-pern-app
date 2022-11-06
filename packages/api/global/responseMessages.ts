type ResponseMessage = { [key: string]: { message: string; status: number } };

const errorResponse: ResponseMessage = {
  oops: { message: "Oops, something went wrong", status: 500 },
  invalidToken: { message: "Invalid token", status: 401 },
  missingReqFields: { message: "Missing required fields", status: 400 },
  unauthorized: { message: "Unauthorized", status: 401 },
  notUnique: { message: "already exists", status: 409 },
  notFound: { message: "not found", status: 404 },
};

const responseMessages = { errorResponse };

export default responseMessages;
