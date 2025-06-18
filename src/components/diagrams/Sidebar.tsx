import React from 'react';

const awsComponents = ['EC2', 'S3', 'Lambda', 'RDS'];

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: 10, width: 150, background: '#f0f0f0' }}>
      <h4>AWS Services</h4>
      {awsComponents.map((service) => (
        <div
          key={service}
          onDragStart={(e) => onDragStart(e, service)}
          draggable
          style={{
            marginBottom: 10,
            padding: 8,
            background: '#fff',
            border: '1px solid #ccc',
            cursor: 'grab',
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          {service}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
