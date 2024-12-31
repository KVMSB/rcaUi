import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, List, ListItem, ListItemText, TextField, ListItemButton } from '@mui/material';
import ImpactAssessmentQuestions from './ImpactAssementQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { imapactAssesment } from '../services/apiService';
import { updateAll } from '../redux/slices/impactAssesmentSlice';

const ImpactAssessment = (props) => {
  const impactTypes = ['Product', 'Process', 'Practice', 'Regulatory Compliance'];
  const [selectedPage, setSelectedPage] = useState('Product');
  const event = useSelector(state => state.event);
  const establishment = useSelector((state) => state.establishment);
  const finalRootCause = establishment.establishmentSummary.filter(x => x.approve == "true");
  const [questions, setQestions] = useState([]);
  const imapactAssesmentState = useSelector((state) => state.imapactAssesment);
  const [allQuestions, setAllQestions] = useState(imapactAssesmentState);
  const dispacth = useDispatch();

  useEffect(()=>{
    setAllQestions(imapactAssesmentState)
  },[imapactAssesmentState])

  useEffect(() => {
    if (!(allQuestions?.impact_practice
      || allQuestions?.impact_process
      || allQuestions?.impact_product
      || allQuestions?.impact_compliance)) {
      props.setLoading(true);
      let req = {
        incident: event,
        final_root_cause: finalRootCause[0]
      }
      imapactAssesment(req).then(res => {
        let qes = JSON.parse(res.data);
        let prodqes = qes["impact_product"].map((x, index) => {
          return {
            id: index,
            question: x,
            answer: ''
          }
        });
        let procqes = qes["impact_process"].map((x, index) => {
          return {
            id: index,
            question: x,
            answer: ''
          }
        });
        let practqes = qes["impact_practice"].map((x, index) => {
          return {
            id: index,
            question: x,
            answer: ''
          }
        });
        let compqes = qes["impact_compliance"].map((x, index) => {
          return {
            id: index,
            question: x,
            answer: ''
          }
        });
        setAllQestions({
          impact_product: prodqes,
          impact_process: procqes,
          impact_practice: practqes,
          impact_compliance: compqes
        });

dispacth(updateAll({
  impact_product: prodqes,
  impact_process: procqes,
  impact_practice: practqes,
  impact_compliance: compqes
}))

        let prodQes = prodqes;
        setQestions(prodQes);
        props.setLoading(false);

      }).catch(err => {
        console.log(err);
        props.setLoading(false);
      })
    }
  }, [allQuestions])

  const changePage = (type) => {
    setSelectedPage(type);
    switch (type.toLowerCase()) {
      case "product":
        let prodQes = allQuestions["impact_product"];
        setQestions(prodQes);
        break;
      case "process":
        let processQes = allQuestions["impact_process"];
        setQestions(processQes);
        break;
      case "practice":
        let practQes = allQuestions["impact_practice"];
        setQestions(practQes);
        break;
      case "regulatory compliance":
        let complainceQes = allQuestions["impact_compliance"];
        setQestions(complainceQes);
        break;
      default:
        break;
    }
  }

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box width="20%" bgcolor="#f5f5f5" p={2}>
        <Typography variant="h6" gutterBottom>
          Impact Types
        </Typography>
        <List>
          {impactTypes.map((type, index) => (
            <ListItem
              button
              key={index}
              className={selectedPage === type ? 'selected' : ''}
            >
              <ListItemButton
                selected={selectedPage === type}
                className='listBtn'
                onClick={() => changePage(type)}
              >
                {type}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Table */}
      <Box width="80%" p={2}>
        <Typography variant="h5" gutterBottom>
          Impact Assessment
        </Typography>
        <TableContainer component={Paper}>
          {questions?.length > 1 ?
            <ImpactAssessmentQuestions type={selectedPage} questions={questions} /> : null}
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ImpactAssessment;
