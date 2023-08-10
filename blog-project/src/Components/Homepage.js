import { useState } from "react";
const Homepage=()=>{
    const [content, setContent] = useState('');

const handleSubmit = () => {
    // onSubmit(content);
    setContent('');
};
return(
    <>
    <div className="post-form">
    <form onSubmit={(e)=> {e.preventDefault()}}>
    <textarea value={content} placeholder="Enter the blog" onChange={(e) => setContent(e.target.value)} />
    <button type="submit">Share</button>
    </form>
    </div>
    <div>
        {content}
    </div>
    </>
)
}
export default Homepage;