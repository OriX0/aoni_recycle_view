import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Avatar, Switch } from 'antd';
import { getUserList } from '@/services/user';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const actionRef = useRef();
  // 获取用户列表
  const getUserData = async function ({ params }) {
    console.log(params);
    const response = await getUserList(params);
    console.log('response: ', response);
    return {
      data: response.data?.userList || [],
      success: true,
      total: response.data?.count || 0,
    };
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => [<Avatar key={record.id} size={64} src={record.avatar} />],
    },
    {
      title: '工号',
      dataIndex: 'userName',
    },
    {
      title: '真实名字',
      dataIndex: 'relaName',
      hideInSearch: true,
    },
    {
      title: '所属城市',
      dataIndex: 'city',
    },
    {
      title: '用户锁定',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => [
        <Switch
          key={record.id}
          checkedChildren="锁定"
          unCheckedChildren="正常"
          defaultChecked={record.is_locked === 1}
        />,
      ],
    },
    {
      title: '操作',
      dataIndex: 'userName',
      hideInSearch: true,
      render: (_, record) => [<a key={record.id}>重置密码 </a>],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={(params = {}) => {
          getUserData(params);
          // eslint-disable-next-line no-console
          console.log(params);
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
}
