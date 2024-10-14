import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useApi from '@/services/api';
import { useAuth0 } from "@auth0/auth0-react";
import { UserProfile } from "@/components/UserProfile";
import { Link } from 'react-router-dom';

export default function WealthManagementDashboard() {
  const { isAuthenticated, isLoading } = useAuth0();
  const api = useApi();

  const [portfolio, setPortfolio] = useState(null);
  const [valorizacionDiaria, setValorizacionDiaria] = useState([]);
  const [activos, setActivos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Authentication status:", isAuthenticated);
      if (!isAuthenticated) {
        console.log("User is not authenticated, skipping data fetch");
        return;
      }

      try {
        console.log("Fetching portfolio data...");
        const portfolioData = await api.fetchPortfolio();
        console.log("Portfolio data received:", portfolioData);
        setPortfolio(portfolioData);

        console.log("Fetching valorizacion data...");
        const valorizacionData = await api.fetchValorizacionDiaria(portfolioData.id);
        console.log("Valorizacion data received:", valorizacionData);
        setValorizacionDiaria(valorizacionData);

        console.log("Fetching activos data...");
        const activosData = await api.fetchActivos(portfolioData.id);
        console.log("Activos data received:", activosData);
        setActivos(activosData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data from the backend');
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!portfolio || valorizacionDiaria.length === 0 || activos.length === 0) {
        return <div className="container mx-auto p-4">Loading...</div>;
  }

  const renderAssetRow = (asset: Asset) => (
    <TableRow key={asset.id}>
      <TableCell>
        <Link to={`/portfolio/${portfolioData.id}/asset/${asset.id}/operations`}>
          {asset.nombre} ({asset.ticker})
        </Link>
      </TableCell>
      {/* ... other table cells ... */}
    </TableRow>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wealth Management Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Evolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valorizacionDiaria.map(v => ({ date: v.fecha, value: v.valor }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha compra</TableHead>
                <TableHead>Valor inicial</TableHead>
                <TableHead>Valor actual</TableHead>
                <TableHead>Ganancia</TableHead>
                <TableHead>Ganancia %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activos.map((activo) => (
                <TableRow key={activo.ticker}>
                  <TableCell>
                    <Link to={`/portfolio/${portfolio.id}/asset/${activo.id}/operations`}>
                      <div>{activo.nombre}</div>
                      <div className="text-sm text-muted-foreground">{activo.ticker}</div>
                    </Link>
                  </TableCell>
                  <TableCell>{activo.fechaCompra}</TableCell>
                  <TableCell>${activo.precioTotalCoste.toFixed(2)}</TableCell>
                  <TableCell>${activo.ultimaValorizacion.toFixed(2)}</TableCell>
                  <TableCell className={activo.ganancia >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${activo.ganancia !== null && activo.ganancia !== undefined ? activo.ganancia.toFixed(2) : '0.00'}
                  </TableCell>
                  <TableCell className={activo.gananciaPorcentaje >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {activo.gananciaPorcentaje !== null && activo.gananciaPorcentaje !== undefined ? activo.gananciaPorcentaje.toFixed(2) : '0.00'}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserProfile />
    </div>
  );
}
