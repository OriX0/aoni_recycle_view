import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Avatar, Switch, message } from 'antd';
import { getUserList, changeUserLock, resetUserPwd } from '@/services/user';
import { UserOutlined } from '@ant-design/icons';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const actionRef = useRef();
  // 获取用户列表
  const getUserData = async (params) => {
    const response = await getUserList(params);
    console.log('response: ', response);
    return {
      data: response.data.userList || [],
      success: true,
      total: response.data.count || 0,
    };
  };
  // 修改用户的禁用和启用
  const handleChangeLock = async (userName, newLock) => {
    const response = await changeUserLock(userName, newLock);
    if (response.errCode === 0) {
      message.success('操作成功');
    } else {
      message.error(response.message);
    }
  };
  // 重置用户密码
  const handleResetPwd = async (userName) => {
    const response = await resetUserPwd(userName);
    if (response.errCode === 0) {
      message.success(`密码已重置----${response.data.newPassword}`);
    } else {
      message.error(response.message);
    }
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => [
        <Avatar key={record.id} size={64} src={record.avatar} icon={<UserOutlined />} />,
      ],
    },
    {
      title: '工号',
      dataIndex: 'userName',
    },
    {
      title: '真实名字',
      dataIndex: 'realName',
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
          defaultChecked={+record.is_locked === 1}
          onChange={(checked) => {
            handleChangeLock(record.userName, +checked);
          }}
        />,
      ],
    },
    {
      title: '操作',
      dataIndex: 'userName',
      hideInSearch: true,
      render: (_, record) => [
        <a
          key={record.id}
          onClick={() => {
            handleResetPwd(record.userName);
          }}
        >
          重置密码{' '}
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={(params = {}) => {
          return getUserData(params);
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
