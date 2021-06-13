/*
 * @Description: 用于新建或者编辑的模态框
 * @Author: OriX
 * @LastEditors: OriX
 */
import React from 'react';
import { Modal, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { addUser } from '@/services/user';

const CreateOrEditModel = (props) => {
  const { isShowModel, changeModelVisible, actionRef } = props;
  const handleSubmit = async (values) => {
    const response = await addUser(values);
    if (response.errCode === 0) {
      message.success('用户添加成功');
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      changeModelVisible(false);
    }
  };

  return (
    <Modal
      title="新建用户"
      visible={isShowModel}
      onCancel={() => {
        changeModelVisible(false);
      }}
      footer={null}
      destroyOnClose={true}
      forceRender={true}
    >
      <ProForm
        onFinish={(values) => {
          handleSubmit(values);
        }}
      >
        <ProFormText
          width="md"
          name="userName"
          label="用户名(钉钉号)"
          placeholder="请输入用户 钉钉工号"
          rules={[{ require: true, message: '用户名是必填项' }]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码(有默认密码 不填则为默认密码)"
          rules={[{ min: 6, message: '密码最小6位' }]}
        />
        <ProFormText
          width="md"
          name="realName"
          label="真实名字"
          placeholder="请输入真实名字"
          rules={[{ require: true, message: '真实名字是必填的' }]}
        />
        <ProFormSelect
          // TODO:服务器设置城市列表以获取
          options={[
            {
              value: '杭州',
              label: '杭州',
            },
            {
              value: '北京',
              label: '北京',
            },
            {
              value: '武汉',
              label: '武汉',
            },
            {
              value: '上海',
              label: '上海',
            },
          ]}
          initialValue="杭州"
          width="md"
          name="city"
          label="员工所属城市"
        />
      </ProForm>
    </Modal>
  );
};

export default CreateOrEditModel;
