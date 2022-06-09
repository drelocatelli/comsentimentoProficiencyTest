import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Notices({callback}) {

    const cookies = new Cookies();
    const [notices, setNotices] = useState(undefined);

    useEffect(() => {
        fetchNotices();
    }, []);

    async function fetchNotices() {
        try {
            const response = await callback();

            setNotices(response.data);

        } catch (err) {
            setNotices('error')
        }
    }

    switch (notices) {
        case undefined:
            return (<>Carregando</>);
            break;
        case 'error':
            return (<>Ocorreu um erro</>);
    }

    return (
        <>
            {(callback.name == 'allNotices') ? <h3>Todos editais ({notices.length})</h3> : <h3 style={{float:'left'}}>Meus editais ({notices.length})</h3>}

            <br />

            {(callback.name == 'myNotices') ?
                <>
                    <button type="button" style={{float: 'right', position: 'relative', top: '-20px'}}>
                        Novo edital
                    </button>
                    <div style={{clear: 'both'}}></div>
                </>
             : null}



            {notices.map((notice) => {
                return (
                    <div className="notice">
                        <h3>{notice.title}</h3>
                        <div className="info">
                            <li>Publicado em: {notice.date}</li>
                            <li className="separator">/</li>
                            <li className="separator">/</li>
                            <li>Autor: {notice.user.name}</li>
                            <li className="separator">/</li>
                            <li>Anexo: {notice.file}</li>
                            <li className="separator">/</li>
                            <li>Status: <b className={`status_${notice.status}`}>{(notice.status == 'OPEN' ? 'ABERTO' : 'FECHADO')}</b></li>
                        </div>
                        <div className="description">
                            <b>Descrição:</b> {notice.description}
                        </div>
                    </div>
                );
            })}

        </>
    );
}