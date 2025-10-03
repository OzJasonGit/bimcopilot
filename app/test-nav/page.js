import { ShadCN_Header } from '../../components/Header/ShadCN_Header/shadCN_Header';

export default function TestNav() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5' }}>
      <h1>Navigation Menu Test</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <ShadCN_Header/>
      </div>
    </div>
  );
}
