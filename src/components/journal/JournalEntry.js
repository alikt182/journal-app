import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);
    
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( 
            activeNote(id,{
                date, title, body, url
            })
        );
    }

    return (
        <div 
            className="journal__entry pointer  animate__animated animate__bounce animate__bounceInLeft"
            onClick={ handleEntryClick }
        
        >
            
            {          
                url &&  

                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize:'cover',
                        //backgroundImage: 'url(https://i.blogs.es/e0ac37/windows-11/1366_2000.jpg)',
                        backgroundImage: `url(${ url })`,

                    }}

                >
                </div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-tittle">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry_date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>

            </div>
        </div>
    )
}
