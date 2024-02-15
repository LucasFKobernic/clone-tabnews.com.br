function status(request, response) {
  response.status(200).json({ chave: "Request worked." });
}

export default status;
