import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Renderblogs = () => {
  const data = `# hello its hunny
### how are you 
![check](https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60) `;
  return (
    <div>
      <ReactMarkdown children={data} />
    </div>
  );
};

export default Renderblogs;
