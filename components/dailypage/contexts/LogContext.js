import React, { useEffect, useRef } from 'react';
import { createContext, useState } from 'react';
import logsStorage from '../storages/logsStorage';
import axios from 'axios';

const LogContext = createContext();

export function LogContextProvider({ children }) {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const onCreate = ({ title, date, destination, time }) => {
    const formattedDate = date.split("T")[0];

    const log = {
      id: Date.now().toString(),
      title,
      date,
      // formattedDate,
      destination,
      time,
    };

    console.log(log);

    // 일정 데이터 전송(DB 수정되면 코드 작성)
    // axios.post('https://todohaemil.com/schedules/schedule')

    setLogs([log, ...logs]);
  };

  const onModify = (modified) => {
    // logs 배열을 순회해 id가 일치하면 log를 교체하고 그렇지 않으면 유지
    const nextLogs = logs.map((log) =>
      log.id === modified.id ? modified : log
    );
    setLogs(nextLogs);
  };

  const onRemove = (id) => {
    const nextLogs = logs.filter((log) => log.id !== id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  const initialLog = {
    id: '', // 로그의 고유 ID
    title: '', // 제목
    body: '', // 내용
    date: '', // 날짜 및 시간 (ISO 문자열)
    destination: '', // 목적지
    time: '', // 시간
  };

  return (
    <LogContext.Provider value={{ logs, onCreate, onModify, onRemove, initialLog }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
