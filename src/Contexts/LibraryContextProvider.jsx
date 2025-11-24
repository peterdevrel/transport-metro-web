import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './UserContextProvider'


const LibraryContext = createContext()


const LibraryContextProvider = ({children}) => {


    const {userdata}  = useAuthContext()
    const access = localStorage.getItem('access')

    
    const [librarycategory, setLibraryCategory]= useState("")
    const [author, setAuthor]= useState("")
    const [booktitle, setBookTitle]= useState("")
    const [bookdescription, setBookDescription]= useState("")
    const [availableCopies, setAvailableCopies]= useState("")
    const [ borroweddate, setBorrowedDate]= useState("")
    const [ returndate, setReturnedDate]= useState("")
    const [coverPage, setCoverPage]= useState("")
    const [libraryCategoryData, setLibraryCategoryData]= useState([])
    const [ librarybookdata, setLibraryBookData]= useState([])
    const [ libraryBorrowedBookData, setLibraryBorrowedBookData]= useState([])
  
    
    const getAllBookCategoryData = () => {
        return fetch(`${import.meta.env.VITE_BASE_URL}library/categories/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
        // console.log(data)
            var count = Object.keys(data).length;
            let libraryArray = []
            for (var i = 0; i < count; i++){
                libraryArray.push({
                value: data[i]?.id,
                label: data[i]?.name,
            })
            }
            setLibraryCategoryData(libraryArray)
        }).catch(error=> console.log(error)) 
    }

  

        const addLibraryBook = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}library/books/`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        // 'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: body
                })
                
            } catch (error) {
                console.log(error)
            }
        }

        const borrowedBookFromLibrary = (body) => {
            try {
                return fetch(`${import.meta.env.VITE_BASE_URL}library/borrows/`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${access}`
                    },
                    body: JSON.stringify(body)
                })
                
            } catch (error) {
                console.log(error)
            }
        }
     

    const getAllBorrowedBookData = () => {
        return fetch(`${import.meta.env.VITE_BASE_URL}library/all/borrows/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log('borrowed', data)
            setLibraryBorrowedBookData(data)
        }).catch(error=> console.log(error)) 
    }
    

         
    const getAllBookData = () => {
        return fetch(`${import.meta.env.VITE_BASE_URL}library/books/`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setLibraryBookData(data)
        }).catch(error=> console.log(error)) 
    }
    

    const updateBook = (bookId, formData) => {
    return fetch(`${import.meta.env.VITE_BASE_URL}library/books/${bookId}/`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData, // Do NOT set Content-Type when sending FormData
    });
    };


    const returnedBookToLibrary = (id, body) => {
        try {
            return fetch(`${import.meta.env.VITE_BASE_URL}library/borrows/${id}/return_book/`,{
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    
    const formatTimeStamp = (timestamp) => {
        const date = new Date(Date.parse(timestamp));
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true})
        return `${formattedDate} at ${formattedTime}`
      }

   
  return (
    <LibraryContext.Provider value={{
      getAllBookCategoryData,
      libraryCategoryData, setLibraryCategoryData,
      librarycategory, setLibraryCategory,
      author, setAuthor,
      booktitle, setBookTitle,
      bookdescription, setBookDescription,
      availableCopies, setAvailableCopies,
      coverPage, setCoverPage,
      addLibraryBook,
      getAllBookData,
      librarybookdata, setLibraryBookData,
      updateBook,
      formatTimeStamp,
      borroweddate, setBorrowedDate,
      returndate, setReturnedDate,
      borrowedBookFromLibrary,
      libraryBorrowedBookData, setLibraryBorrowedBookData,
      getAllBorrowedBookData,
      returnedBookToLibrary
    }}>

      {children}

    </LibraryContext.Provider>
  )
}

export default LibraryContextProvider

export const useLibrary = () => useContext(LibraryContext)
