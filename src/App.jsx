import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { Textarea } from './components/ui/textarea';
import { Plus, Edit, Trash } from 'lucide-react';

const teams = ['Groc', 'Verd', 'Roig'];
const defaultUsers = {
  admin: { password: '1234', role: 'admin' },
};

export default function FutbolAdminApp() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [users, setUsers] = useState(defaultUsers);
  const [players, setPlayers] = useState({ Groc: [], Verd: [], Roig: [] });
  const [news, setNews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [newArticle, setNewArticle] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Groc');
  const [messageText, setMessageText] = useState('');
  const [messageRecipient, setMessageRecipient] = useState('');

  const handleLogin = () => {
    const user = users[loginData.username];
    if (user && user.password === loginData.password) {
      setLoggedInUser({ username: loginData.username, role: user.role });
    } else {
      alert('Usuari o contrasenya incorrecte');
    }
  };

  const addPlayer = () => {
    if (!newPlayer) return;
    const username = newPlayer.toLowerCase().replace(/\s+/g, '');
    setPlayers({
      ...players,
      [selectedTeam]: [...players[selectedTeam], newPlayer],
    });
    setUsers({
      ...users,
      [username]: { password: 'default', role: 'player' },
    });
    setNewPlayer('');
  };

  const removePlayer = (index) => {
    setPlayers({
      ...players,
      [selectedTeam]: players[selectedTeam].filter((_, i) => i !== index),
    });
  };

  const addNews = () => {
    if (!newArticle) return;
    setNews([{ content: newArticle, id: Date.now() }, ...news]);
    setNewArticle('');
  };

  const deleteNews = (id) => {
    setNews(news.filter(n => n.id !== id));
  };

  const sendMessage = () => {
    if (!messageText || !messageRecipient) return;
    setMessages([
      ...messages,
      {
        from: loggedInUser.username,
        to: messageRecipient,
        text: messageText,
        id: Date.now(),
      },
    ]);
    setMessageText('');
    setMessageRecipient('');
  };

  if (!loggedInUser) {
    return (
      <div className="p-4 max-w-sm mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Inici de Sessió</h2>
        <Input
          placeholder="Usuari"
          className="mb-2"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <Input
          placeholder="Contrasenya"
          type="password"
          className="mb-4"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <Button className="w-full" onClick={handleLogin}>Entrar</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Benvingut {loggedInUser.username}</h1>
      <Tabs defaultValue="plantilles" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="plantilles">Plantilles</TabsTrigger>
          <TabsTrigger value="noticies">Notícies</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="canvis">Actualitzacions</TabsTrigger>
          <TabsTrigger value="missatges">Missatges</TabsTrigger>
        </TabsList>

        <TabsContent value="plantilles">
          {loggedInUser.role === 'admin' && (
            <>
              <div className="mb-4 flex gap-2">
                {teams.map((team) => (
                  <Button
                    key={team}
                    variant={selectedTeam === team ? 'default' : 'outline'}
                    onClick={() => setSelectedTeam(team)}
                  >
                    {team}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Input
                  placeholder="Nom del jugador"
                  value={newPlayer}
                  onChange={(e) => setNewPlayer(e.target.value)}
                />
                <Button onClick={addPlayer}>
                  <Plus className="mr-2 h-4 w-4" />Afegir
                </Button>
              </div>
            </>
          )}
          <Card>
            <CardContent className="p-4">
              <ul>
                {players[selectedTeam].map((player, index) => (
                  <li key={index} className="flex justify-between items-center border-b py-2">
                    {player}
                    {loggedInUser.role === 'admin' && (
                      <Button variant="ghost" onClick={() => removePlayer(index)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="noticies">
          {loggedInUser.role === 'admin' && (
            <div className="mb-4">
              <Textarea
                placeholder="Escriu una nova notícia..."
                value={newArticle}
                onChange={(e) => setNewArticle(e.target.value)}
              />
              <Button className="mt-2" onClick={addNews}>Publicar notícia</Button>
            </div>
          )}
          <div className="space-y-4">
            {news.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex justify-between items-start">
                  <p>{item.content}</p>
                  {loggedInUser.role === 'admin' && (
                    <Button variant="ghost" onClick={() => deleteNews(item.id)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rankings">
          <p className="text-gray-500">Classificacions personalitzades disponibles aviat...</p>
        </TabsContent>

        <TabsContent value="canvis">
          <p className="text-gray-500">Historial de canvis i actualitzacions en construcció...</p>
        </TabsContent>

        <TabsContent value="missatges">
          <div className="mb-4">
            <Input
              placeholder="Destinatari (usuari)"
              className="mb-2"
              value={messageRecipient}
              onChange={(e) => setMessageRecipient(e.target.value)}
            />
            <Textarea
              placeholder="Escriu el teu missatge"
              className="mb-2"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button onClick={sendMessage}>Enviar missatge</Button>
          </div>
          <div className="space-y-2">
            {messages
              .filter(m => m.to === loggedInUser.username || m.from === loggedInUser.username)
              .map((msg) => (
                <Card key={msg.id}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">
                      De <strong>{msg.from}</strong> a <strong>{msg.to}</strong>
                    </p>
                    <p>{msg.text}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}