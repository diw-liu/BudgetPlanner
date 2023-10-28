import { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useScrollToTop from '../supplement/useScrollToTopWithOffset';
import { Platform } from 'react-native';

const ViewTrans = () => {
  const ref = useRef<ScrollView>(null);
  useScrollToTop(
    ref,
    Platform.select({
      ios: -150,
      default: 0,
    })
  );
  const [page, setPage] = useState<number>(0);
  // const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(9);

  const [items] = useState([
   {
     key: 1,
     name: 'Cupcake',
     calories: 356,
     fat: 16,
   },
   {
     key: 2,
     name: 'Eclair',
     calories: 262,
     fat: 16,
   },
   {
     key: 3,
     name: 'Frozen yogurt',
     calories: 159,
     fat: 6,
   },
   {
     key: 4,
     name: 'Gingerbread',
     calories: 305,
     fat: 3.7,
   },
   {
    key: 1,
    name: 'Cupcake',
    calories: 356,
    fat: 16,
  },
  {
    key: 2,
    name: 'Eclair',
    calories: 262,
    fat: 16,
  },
  {
    key: 3,
    name: 'Frozen yogurt',
    calories: 159,
    fat: 6,
  },
  {
    key: 4,
    name: 'Gingerbread',
    calories: 305,
    fat: 3.7,
  },{
    key: 1,
    name: 'Cupcake',
    calories: 356,
    fat: 16,
  },
  {
    key: 2,
    name: 'Eclair',
    calories: 262,
    fat: 16,
  },
  {
    key: 3,
    name: 'Frozen yogurt',
    calories: 159,
    fat: 6,
  },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
      <ScrollView 
      ref={ref}>
      <DataTable>
      <DataTable.Header>
        <DataTable.Title sortDirection='ascending'>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        // numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
      </ScrollView>
  );
};

export default ViewTrans