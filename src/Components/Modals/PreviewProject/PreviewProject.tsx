import React, { useEffect, useState } from 'react';
import { Divider, Modal, message } from 'antd';
import closeIcon from '../../../assets/images/pngs/close.png';
import './PreviewProject.scss';

import { useAppDispatch } from '../../../store';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes,
  MarketPlaces
} from '../../UI/Button/enums';
import { Button } from '../../UI';
import {
  actionLeavePostProposeProject,
  actionPostProposeProject
} from '../../../store/Projects/actions';
import { IPostProposeProjectParams } from '../../../requests/Projects/ProjectsRequest.type';
import { useSelector } from 'react-redux';
import { selectorPostProposeProjectErrors } from '../../../store/Projects/selectors';
import { TOAST_MESSAGES } from '../../../config';
import { ListErrors } from '../../Shared';
import { replaceProjectType } from '../../../utils';
import { isEmpty, map, startCase } from 'lodash';

interface PreviewProjectModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  projects: any;
  formRef?: any;
}

export const PreviewProjectModal: React.FC<PreviewProjectModalProps> = ({
  className = '',
  isOpen,
  onClose,
  projects,
  formRef
}) => {
  const dispatch = useAppDispatch();
  const errors = useSelector(selectorPostProposeProjectErrors);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let params: IPostProposeProjectParams;
    if (projects?.marketplace === MarketPlaces.NRC_SUDAN) {
      params = {
        name: projects?.name,
        type: projects?.type,
        country: projects?.country,
        state: projects?.state,
        township: projects?.township,
        period_of_delivery: projects?.periodOfdelivery,
        estimated_beneficiaries: projects?.beneficiaries,
        description_burmese: projects?.description,
        description_english: projects?.description,
        summary: projects?.summary,
        fund_eth: projects?.cost,
        image: projects?.projectImageFile,
        start_date: projects?.start_date,
        end_date: projects?.end_date,
        marketplace: projects.marketplace,

        target_group: projects?.target_group,
        project_goal: projects?.project_goal,
        key_activities: projects?.key_activities,

        main_activities: projects?.main_activities,

        activity_reason_and_connection: projects?.activity_reason_and_connection,
        supporting_evidence_and_collection_method:
          projects?.supporting_evidence_and_collection_method,
        coordination_and_permissions: projects?.coordination_and_permissions,
        accountability_and_feedback: projects?.accountability_and_feedback,
        safety_and_risk_management: projects?.safety_and_risk_management,
        financial_management_experience: projects?.financial_management_experience,
        verification_of_results: projects?.verification_of_results,
        support_needed_from_NRC: projects?.support_needed_from_NRC,
        long_term_partnership_intent: projects?.long_term_partnership_intent,
        budget: projects?.budget
      };
    } else {
      params = {
        name: projects?.name,
        type: projects?.type,
        country: projects?.country,
        state: projects?.state,
        township: projects?.township,
        period_of_delivery: projects?.periodOfdelivery,
        estimated_beneficiaries: projects?.beneficiaries,
        description_burmese: projects?.description,
        description_english: projects?.description,
        summary: projects?.summary,
        fund_eth: projects?.cost,
        facebook: projects?.facebook,
        twitter: projects?.twitter,
        telegram: projects?.telegram,
        mobile_numbers: projects?.mobile_numbers,
        image: projects?.projectImageFile,
        start_date: projects?.start_date,
        end_date: projects?.end_date,
        marketplace: projects.marketplace
      };
    }
    setLoading(true);
    dispatch(
      actionPostProposeProject({
        params: params,
        callback: (isSuccess) => {
          if (isSuccess) {
            setLoading(false);
            formRef?.current?.resetForm();
            messageApi.open({
              type: 'success',
              content: TOAST_MESSAGES.project.create_project_success,
              duration: 10
            });
            onClose();
          }
          setLoading(false);
        }
      })
    );

    return dispatch(actionLeavePostProposeProject());
  };

  useEffect(() => {
    if (errors) {
      setLoading(false);
    }
  }, [errors]);

  return (
    <div className="preview-project-wrapper">
      <Modal
        open={isOpen}
        onCancel={onClose}
        className={`preview-project-modal ${className}`}
        footer={null}
        maskClosable={false}
        closeIcon={<img src={closeIcon} alt="close" />}>
        <h2 className="preview-project-modal-title">Project preview</h2>
        <div className="preview-project-modal-content">
          <div className="preview-project-modal-content-item">
            <label className="preview-project-modal-content-item-title">Project Name: </label>
            <span className="preview-project-modal-content-item-text">{projects?.name}</span>
          </div>
          <div className="preview-project-modal-content-item">
            <label className="preview-project-modal-content-item-title">Type of Project:</label>
            <span className="preview-project-modal-content-item-text">
              {replaceProjectType(projects?.type)}
            </span>
          </div>
          <div className="preview-project-modal-content-item">
            <label className="preview-project-modal-content-item-title">Country:</label>
            <span className="preview-project-modal-content-item-text">{projects?.country}</span>
          </div>
          {projects?.state && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">State:</label>
              <span className="preview-project-modal-content-item-text">{projects?.state}</span>
            </div>
          )}

          {projects?.township && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Township/city:</label>
              <span className="preview-project-modal-content-item-text">{projects?.township}</span>
            </div>
          )}

          <div className="preview-project-modal-content-item">
            <label className="preview-project-modal-content-item-title">Period of Delivery:</label>
            <span className="preview-project-modal-content-item-text">
              {projects?.periodOfdelivery}
            </span>
          </div>
          {projects?.beneficiaries && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Estimated Beneficiaries:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.beneficiaries} USD
              </span>
            </div>
          )}
          {projects?.description && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Brief Description:</label>
              <span className="preview-project-modal-content-item-text">
                {projects?.description}
              </span>
            </div>
          )}
          {projects?.summary && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Summary Description:
              </label>
              <span className="preview-project-modal-content-item-text">{projects?.summary}</span>
            </div>
          )}
          {projects?.cost && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Cost:</label>
              <span className="preview-project-modal-content-item-text">{projects?.cost} USD</span>
            </div>
          )}
          <div className="preview-project-modal-content-item">
            <label className="preview-project-modal-content-item-title">Marketplace:</label>
            <span className="preview-project-modal-content-item-text">
              {startCase(String(projects?.marketplace).replace('_', ' ').toLowerCase())}
            </span>
          </div>
          {projects?.imageUrl && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Project Thumbnail:</label>
              <img
                className="preview-project-modal-content-item-image"
                src={projects?.imageUrl}
                alt=""
              />
            </div>
          )}

          {projects?.facebook && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Facebook:</label>
              <span className="preview-project-modal-content-item-text">{projects?.facebook}</span>
            </div>
          )}
          {projects?.telegram && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Telegram:</label>
              <span className="preview-project-modal-content-item-text">{projects?.telegram}</span>
            </div>
          )}
          {projects?.twitter && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Twitter:</label>
              <span className="preview-project-modal-content-item-text">{projects?.twitter}</span>
            </div>
          )}
          {projects?.mobile_numbers && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Signal:</label>
              <span className="preview-project-modal-content-item-text">
                {projects?.mobile_numbers}
              </span>
            </div>
          )}

          {projects?.target_group && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Target group:</label>
              <span className="preview-project-modal-content-item-text">
                {projects?.target_group}
              </span>
            </div>
          )}

          {projects?.mobile_numbers && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Signal:</label>
              <span className="preview-project-modal-content-item-text">
                {projects?.mobile_numbers}
              </span>
            </div>
          )}

          {projects?.project_goal && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Project goal and objective:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.project_goal}
              </span>
            </div>
          )}

          {projects?.key_activities && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Key activities:</label>
              <span className="preview-project-modal-content-item-text">
                {projects?.key_activities}
              </span>
            </div>
          )}

          {!isEmpty(projects?.main_activities) && (
            <>
              <div className="preview-project-modal-content-main">Planned activities</div>
              {map(projects?.main_activities, (item: any, index: number) => (
                <>
                  <div className="preview-project-modal-content-title">Activities {index + 1}</div>
                  {item?.planned_activities && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">
                        List of planned activities:
                      </label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.planned_activities}
                      </span>
                    </div>
                  )}

                  {item?.geo_location && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">
                        Precise Geographic Location:
                      </label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.geo_location}
                      </span>
                    </div>
                  )}

                  {item?.when && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">When:</label>
                      <span className="preview-project-modal-content-item-text">{item?.when}</span>
                    </div>
                  )}

                  {item?.delivered_by && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">
                        Delivered by:
                      </label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.delivered_by}
                      </span>
                    </div>
                  )}

                  {item?.number_of_supported && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">
                        Number of people to be supported with the activity:
                      </label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.number_of_supported}
                      </span>
                    </div>
                  )}

                  {item?.inputs_required && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">
                        Inputs required:
                      </label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.inputs_required}
                      </span>
                    </div>
                  )}

                  {item?.verification_means && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">
                        Means of verification:
                      </label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.verification_means}
                      </span>
                    </div>
                  )}

                  {item?.cost_usd && (
                    <div className="preview-project-modal-content-item">
                      <label className="preview-project-modal-content-item-title">Cost USD:</label>
                      <span className="preview-project-modal-content-item-text">
                        {item?.cost_usd} USD
                      </span>
                    </div>
                  )}
                  <Divider />
                </>
              ))}
            </>
          )}

          {projects?.activity_reason_and_connection && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Activity reason and connection:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.activity_reason_and_connection}
              </span>
            </div>
          )}

          {projects?.supporting_evidence_and_collection_method && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Supporting evidence and collection method:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.supporting_evidence_and_collection_method}
              </span>
            </div>
          )}

          {projects?.coordination_and_permissions && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Coordination and permissions:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.coordination_and_permissions}
              </span>
            </div>
          )}

          {projects?.accountability_and_feedback && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Accountability and feedback:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.accountability_and_feedback}
              </span>
            </div>
          )}

          {projects?.safety_and_risk_management && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Safety and risk management:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.safety_and_risk_management}
              </span>
            </div>
          )}

          {projects?.financial_management_experience && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Financial management experience:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.financial_management_experience}
              </span>
            </div>
          )}

          {projects?.verification_of_results && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Verification of results:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.verification_of_results}
              </span>
            </div>
          )}

          {projects?.support_needed_from_NRC && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Support needed from NRC:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.support_needed_from_NRC}
              </span>
            </div>
          )}

          {projects?.long_term_partnership_intent && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">
                Long term partnership intent:
              </label>
              <span className="preview-project-modal-content-item-text">
                {projects?.long_term_partnership_intent}
              </span>
            </div>
          )}

          {!isEmpty(projects?.budget) && (
            <div className="preview-project-modal-content-item">
              <label className="preview-project-modal-content-item-title">Budget:</label>
              <span className="preview-project-modal-content-item-text">
                {projects?.budget?.name}
              </span>
            </div>
          )}

          {errors && <ListErrors errors={errors} />}

          <Button
            submit
            className="submit-btn"
            type={ButtonTypes.filled}
            size={ButtonSizes.smallMedium}
            color={ButtonColors.white}
            background={ButtonBackgrounds.black}
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}>
            Submit
          </Button>
        </div>
      </Modal>
      {contextHolder}
    </div>
  );
};
