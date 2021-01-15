import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledIcon } from '../../../common';

const I = styled(StyledIcon)``;

const StepsTableRow = ({
  idx,
  stepsTableRow,
  setShowModalStep,
  removeStep,
}) => {
  const {
    id,
    app_id,
    date,
    step_type,
    contact_name,
    contact_role,
    contact_info,
    notes,
  } = stepsTableRow;

  return (
    <tr className="stepsTa">
      <td>{new Date(date).toLocaleDateString('en-US')}</td>
      <td>{step_type}</td>
      <td>{contact_name}</td>
      <td>{contact_role}</td>
      <td>
        <a
          href={`mailto:${contact_info}`}
          data-toggle="tooltip"
          title="Send me Email!"
          style={{ color: 'black' }}
        >
          {contact_info}
        </a>
      </td>
      <td>{notes}</td>
      <td className="operation">
        <I onClick={() => setShowModalStep({ action: 'edit', id: idx })}>
          <FontAwesomeIcon icon={faPen} />
        </I>
        <I onClick={() => removeStep(app_id, id)}>
          <FontAwesomeIcon icon={faTrash} />
        </I>
      </td>
    </tr>
  );
};

export default StepsTableRow;
