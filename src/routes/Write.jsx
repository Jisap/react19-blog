import React from 'react';
import { useUser } from '@clerk/clerk-react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

const Write = () => {

  const { isLoaded, isSignedIn} = useUser()

  if(!isLoaded) {
    return <div>Loading...</div>
  }

  if(isLoaded && !isSignedIn) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <h1>
        Create a New Post
      </h1>
      <form>
        <button>Add a cover image</button>
        <input type="text" placeholder="My Awesome Story" />
        <div>
          <label htmlFor="">Choose a category</label>
          <select name="cat" id="">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea 
          name="desc" 
          placeholder="A short description"
        />
        <ReactQuill theme="snow" /> 
        <button>Send</button>
      </form>
    </div>
  )
}

export default Write