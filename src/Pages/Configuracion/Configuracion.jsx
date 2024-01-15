function HomologationConfigurations({}) {
  const [documents, setDocuments] = useState();
  const [deadline, setDeadline] = useState();

  function handleDocumentChange(index, event) {
    const newDocuments = [...documents];
    newDocuments[index] = event.target.value;
    setDocuments(newDocuments);
  }

  function handleDeadlineChange(event) {
    setDeadline(event.target.value);
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>Required documents:</p>
      <ul>
        {documents.map((document, index) => (
          <li key={index}>
            <input
              type="text"
              value={document}
              onChange={(event) => handleDocumentChange(index, event)}
            />
          </li>
        ))}
      </ul>
      <p>Submission deadline:</p>
      <input type="date" value={deadline} onChange={handleDeadlineChange} />
    </div>
  );
}

export default HomologationConfigurations;
