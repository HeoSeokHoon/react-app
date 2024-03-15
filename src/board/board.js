import logo from '../logo.svg';
import '../App.css';
import React, { useEffect, useState } from 'react';

function Notice() {
  const [count, setCount] = useState(1);
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    listReq();
  }, [count]);
  
  function pageUp(){
    setCount(count+1);
  }
  function pageDown(){
    setCount(count-1);
  }

  const listReq = async () => {
    try {
      const response = await fetch(`http://localhost/notice/list?page=${count}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch notice list");
      }

      const data = await response.json();
      
      setNoticeList(data); // 받아온 데이터를 상태로 설정
    } catch (error) {
      console.error("Error fetching notice list:", error);
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Notice List
        </p>
        <div className='row'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Num</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Date</th>
              <th>Hit</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((notice, index) => (
              <tr key={index}>
                <td>{notice.boardNum}</td>
                <td>{notice.boardHead}</td>
                <td>{notice.boardWriter}</td>
                <td>{notice.boardDate}</td>
                <td>{notice.boardHit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='row'>
         <button className='btn btn-primary col mx-3' onClick={pageDown}>이전</button>
          <button className='btn btn-primary col mx-3' onClick={pageUp}>다음</button>
        </div>
      </header>
    </div>
  );
}



export default Notice;
