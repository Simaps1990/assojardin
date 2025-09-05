// Client mock pour remplacer Supabase
// Ce fichier simule les fonctionnalités de Supabase avec des données statiques
import { mockDataStore, updateMockStore } from './mockDataStore';

// Type pour les opérations de base de données simulées
type MockQueryBuilder = {
  select: (columns: string) => MockQueryBuilder;
  insert: (data: any[]) => MockQueryBuilder;
  update: (data: any) => MockQueryBuilder;
  delete: () => MockQueryBuilder;
  eq: (column: string, value: any) => MockQueryBuilder;
  neq: (column: string, value: any) => MockQueryBuilder;
  order: (column: string, options: { ascending: boolean }) => MockQueryBuilder;
  limit: (count: number) => MockQueryBuilder;
  maybeSingle: () => Promise<{ data: any; error: null | { message: string } }>;
  single: () => Promise<{ data: any; error: null | { message: string } }>;
  execute: () => Promise<{ data: any[]; error: null | { message: string } }>;
};

// Fonction pour créer un client mock
const createMockClient = () => {
  // Utiliser le store centralisé pour les données simulées
  const mockData: Record<string, any[]> = mockDataStore;
  
  // Fonction pour créer un builder de requête
  const from = (table: string): any => {
    let currentData = mockData[table] || [];
    let conditions: Array<(item: any) => boolean> = [];
    let orderColumn = '';
    let orderAscending = true;
    let limitCount: number | null = null;
    
    const builder: any = {
      select: () => builder,
      
      insert: (data: any[]) => {
        // Simuler l'insertion de données
        const newData = data.map(item => ({
          ...item,
          id: Math.random().toString(36).substring(2, 15),
          created_at: new Date().toISOString()
        }));
        
        if (!mockData[table]) mockData[table] = [];
        mockData[table] = [...mockData[table], ...newData];
        
        // Mettre à jour le store centralisé
        updateMockStore(table, mockData[table]);
        
        return {
          select: () => ({
            execute: async () => ({ data: newData, error: null })
          })
        };
      },
      
      update: (data: any) => {
        return {
          eq: (column: string, value: any) => {
            // Simuler la mise à jour de données
            if (mockData[table]) {
              const updatedData = mockData[table].map(item => 
                item[column] === value ? { ...item, ...data } : item
              );
              mockData[table] = updatedData;
              
              // Mettre à jour le store centralisé
              updateMockStore(table, mockData[table]);
            }
            
            return {
              select: () => ({
                execute: async () => ({
                  data: mockData[table]?.filter(item => item[column] === value) || [],
                  error: null
                })
              })
            };
          }
        };
      },
      
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            // Simuler la suppression de données
            if (mockData[table]) {
              mockData[table] = mockData[table].filter(item => item[column] !== value);
              
              // Mettre à jour le store centralisé
              updateMockStore(table, mockData[table]);
            }
            
            return {
              execute: async () => ({ data: null, error: null })
            };
          },
          neq: (column: string, value: any) => {
            // Supprimer tous sauf ceux qui correspondent
            if (mockData[table]) {
              mockData[table] = mockData[table].filter(item => item[column] === value);
              
              // Mettre à jour le store centralisé
              updateMockStore(table, mockData[table]);
            }
            
            return {
              execute: async () => ({ data: null, error: null })
            };
          }
        };
      },
      
      eq: (column: string, value: any) => {
        conditions.push((item: any) => item[column] === value);
        return builder;
      },
      
      neq: (column: string, value: any) => {
        conditions.push((item: any) => item[column] !== value);
        return builder;
      },
      
      order: (column: string, options: { ascending: boolean }) => {
        orderColumn = column;
        orderAscending = options.ascending;
        return builder;
      },
      
      limit: (count: number) => {
        limitCount = count;
        return builder;
      },
      
      maybeSingle: async () => {
        let filteredData = currentData;
        
        // Appliquer les conditions
        if (conditions.length > 0) {
          filteredData = filteredData.filter(item => 
            conditions.every(condition => condition(item))
          );
        }
        
        // Appliquer le tri
        if (orderColumn) {
          filteredData.sort((a, b) => {
            if (a[orderColumn] < b[orderColumn]) return orderAscending ? -1 : 1;
            if (a[orderColumn] > b[orderColumn]) return orderAscending ? 1 : -1;
            return 0;
          });
        }
        
        // Appliquer la limite
        if (limitCount !== null) {
          filteredData = filteredData.slice(0, limitCount);
        }
        
        return { data: filteredData[0] || null, error: null };
      },
      
      single: async () => {
        const result = await builder.maybeSingle();
        return result;
      },
      
      execute: async () => {
        let filteredData = currentData;
        
        // Appliquer les conditions
        if (conditions.length > 0) {
          filteredData = filteredData.filter(item => 
            conditions.every(condition => condition(item))
          );
        }
        
        // Appliquer le tri
        if (orderColumn) {
          filteredData.sort((a, b) => {
            if (a[orderColumn] < b[orderColumn]) return orderAscending ? -1 : 1;
            if (a[orderColumn] > b[orderColumn]) return orderAscending ? 1 : -1;
            return 0;
          });
        }
        
        // Appliquer la limite
        if (limitCount !== null) {
          filteredData = filteredData.slice(0, limitCount);
        }
        
        return { data: filteredData, error: null };
      }
    };
    
    return builder;
  };
  
  return { from };
};

export const supabase = createMockClient();
